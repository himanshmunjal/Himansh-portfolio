---
intro: RetailPulse is a six-page Power BI dashboard built on four years of US retail orders, with a hand-built star schema and a DAX measure layer for sales, profit, growth, returns and customer value.
caption: Two Excel workbooks flow through Power Query into a star schema centred on Orders-Table, DAX measures compute the KPIs, and the Report pages show them, with Slicers feeding filter context back into the model.
---

## About

RetailPulse is a Power BI report on 9,994 US retail order lines from 2018 to 2021, covering 5,009 orders, 793 customers and 1,862 products. I wanted one file a manager could open and move through, from headline numbers down to single products and customers, without asking an analyst to rerun anything.

The question behind it is **where does revenue turn into profit, and where does it leak away?** So I gave margin, discounting, returns and customer value as much space as total sales, and every page shares the same Year, Category, Segment and Sub-Category filters.

## Architecture

Two sources feed the report: the Orders workbook (one row per order line) and the Returns workbook (returned order IDs). Power Query shapes them in three steps. Build dimensions pulls customer, product and location columns out of the orders sheet and deduplicates them on their keys. Clean orders promotes headers and drops the row index to produce the fact table. Merge returns left-joins the return list onto every order ID so each order gets an explicit Yes or No.

The result is a star schema. Orders-Table is the fact table; the Dimension tables, Returned and Dim-Date filter it one-to-many, except Dim-Region, which joins on City. DAX measures compute the core KPIs, time intelligence and customer metrics on top of the model, and the Report pages render them. Slicers send filter context back into the model, so every visual recalculates for the current selection.

## How it's implemented

### Splitting one flat sheet into a star schema

The source is one wide sheet. I built each dimension as its own Power Query query over the same file, keeping only its columns and deduplicating on the business key. Small dimension tables with one-to-many relationships keep slicers simple and stop measures double-counting.

### Turning returns into a flag

The returns sheet has 800 rows but only 296 distinct order IDs, and no header row. Instead of relating to it directly, I left-joined it onto the distinct order IDs, replaced nulls with "No" and deduplicated. With exactly one row per order, Return Rate becomes a filtered distinct count divided by total orders.

### A DAX calendar instead of auto date tables

Dim-Date is a calculated table: `CALENDAR` over the Order Date range, with month names, Monday-start week numbers, quarters, an April to March fiscal year and a weekend flag. All time intelligence (`SAMEPERIODLASTYEAR`, `DATEADD`, `DATESINPERIOD`) runs against this one table, so YoY Growth, QoQ Change and Rolling 12M Sales agree on what a period is.

### Customer value segments

Calculated columns compute each customer's lifetime sales with `ALLEXCEPT` on Customer ID, then bucket them into CLV Bins and High, Mid and Low Value segments. Another column marks each order New or Returning by comparing it with the customer's first order date. Revenue Contribution % and Customer % then set each segment's share of revenue against its share of customers.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Language | DAX and Power Query M | DAX for measures and calculated tables, M for repeatable cleaning |
| Framework | Power BI Desktop | Slicers, drill-down, decomposition tree and map visuals built in |
| Data | US retail orders sample, 2018 to 2021 | Enough depth for time, product, region and customer analysis |
| Storage | In-memory model inside the `.pbix` | One self-contained file, no database to run |
| Infra/CI | None, manual refresh from local Excel files | Single-author portfolio report |
| Testing | Manual reconciliation against the source sheets | Report totals match the raw data to the cent |

## Results

| Measure | Baseline | Best |
|---|---|---|
| Annual sales | $484.2K (2018) | **$733.2K (2021)** |
| Orders per year | 969 (2018) | **1,687 (2021)** |
| Active customers per year | 595 (2018) | **693 (2021)** |
| Profit margin | 10.2% (2018) | **13.4% (2020)** |

Sales grew 51% from 2018 to 2021 while orders grew 74%, so growth came from more orders, not bigger ones: average order value fell from $500 to $435. Discounting is the biggest profit lever: lines with no discount earn a 29.5% margin, while lines discounted above 30% lose 48.2% of their sales value.

## What I'd do differently

- With no year selected, the YoY Growth card shows 46.88% because it compares four years of sales with three shifted years; it should show blank or the latest full year.
- The Power Query sources are absolute paths on my machine, so nobody else can refresh the file; I'd use a parameter or a SharePoint folder.
- Dim-Region joins the fact table on City through a many-to-many, bidirectional relationship, and city names repeat across states; a proper location key would be safer.
- The CLV and customer status columns are computed row by row on the fact table; moving them to Dim-Customer would be cheaper and clearer.
