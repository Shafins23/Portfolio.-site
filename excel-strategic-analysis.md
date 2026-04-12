# Excel for Strategic Business Analysis

**By Md. Shafin Shahriar Akhond** | Jan 2026 | 7 min read

*Every few years, someone publishes an article declaring Excel dead. It never is. For structured thinking, scenario modeling, and making complexity legible to stakeholders who don't have a data science background, nothing beats a well-built spreadsheet.*

---

I have a slightly contrarian take on Excel: it's not just a tool, it's a thinking framework. The act of building a model or a tracker in Excel forces you to be explicit about your assumptions, your logic, and the relationships between variables. That discipline — making your reasoning visible and testable — is valuable in itself. It's what separates structured analysis from a gut feeling with a chart on top of it.

During my internship at Nestlé Bangladesh, I built campaign performance trackers for the MAGGI brand team. Nothing exotic — organized data entry, calculated fields, conditional formatting for alerts, pivot tables for weekly summaries. But those tools became the basis for weekly brand discussions, and I learned quickly that the quality of a conversation is often determined by the quality of the data framing it. Bring vague numbers to a meeting and you get a vague discussion. Bring clear, well-organized analysis and suddenly the room is making decisions instead of debating what the situation actually is.

Later, as President of BUP Finance Society, I managed budgets and built financial models for events and initiatives. The stakes were real: misallocated budget meant cancelled programs. Excel was the tool that made complexity manageable, kept everyone accountable to the same numbers, and gave me the structured thinking discipline I needed to lead a team through financial planning for the first time.

## Pivot Tables: Underused, Overestimated

Most people who use pivot tables don't use them to their potential. They treat them as a summarization shortcut — drag a field, get a count, done. That's useful, but it's not analysis. Pivot tables become analytically powerful when you use them to explore dimensional relationships in your data — when you layer multiple variables and look for patterns that wouldn't be visible in a flat table.

In a regional sales context, for instance, a pivot table can show you not just total sales by region but sales by region by product category by month, with a calculated field for growth rate. Suddenly you're not looking at a number; you're looking at a story. Which regions are driving growth in which categories? Where is growth decelerating? Which product lines are concentrated in specific geographies and what does that tell you about the brand's positioning or distribution health?

At Nestlé, I used pivot tables to track MAGGI's campaign performance across different consumer segments and media channels. The same dataset could tell you something completely different depending on which dimension you put in the row versus the column, or which filter you applied. That flexibility — exploring multiple analytical angles without writing a single line of code — is why pivot tables remain one of the most powerful tools available to non-technical business professionals. The constraint isn't the tool; it's the user's willingness to experiment with the data.

## Scenario Planning and What-If Analysis

One of Excel's most underrated capabilities is scenario modeling. The Scenario Manager and Data Tables functions allow you to test multiple assumptions simultaneously and see how they flow through your model. For marketing and business planning, this is invaluable — not because forecasts are ever exactly right, but because thinking through what happens under different conditions prepares you to respond quickly when reality diverges from the plan.

Consider a marketing budget model. Your plan assumes 5% sales growth and a 15% media spend increase. What happens if growth comes in at 2%? What if media costs increase by 20% due to competitive pressure? A well-built scenario model lets you answer those questions in minutes rather than rebuilding assumptions from scratch each time. More importantly, it lets you present stakeholders with a range of outcomes rather than a single-point forecast that will almost certainly be wrong in some dimension.

When I was managing the Finance Society budget at BUP, I built a base-case / optimistic / pessimistic model for our annual flagship event. It wasn't sophisticated by any professional standard, but it meant that when our sponsorship revenue came in lower than expected, we had already modeled that scenario and could act on the contingency plan immediately rather than scrambling to figure out what to cut. That's the real value of what-if analysis — not the model itself, but the thinking it forces you to do in advance.

## Building Dashboards for Non-Technical Stakeholders

Excel dashboards are different from Power BI dashboards in one important way: they're usually consumed in meeting rooms by people who will scroll past the formulas and judge the entire document by how the summary page looks. That's not a criticism — it's a design constraint you need to build for deliberately.

The principles I've developed for Excel dashboards: hide everything non-essential, protect formula cells, use named ranges instead of hard-coded references, and build the summary page as if the reader has thirty seconds and no background context. Labels should be so clear that no verbal explanation is required. Chart titles should state the insight, not just describe the data — "North region outperforming by 12%" is more useful than "Regional Sales Comparison." The goal is a document that drives a decision without requiring the builder to be in the room to translate it.

Color should communicate status, not decorate. I use a simple three-color system: green for on-track, amber for attention needed, red for underperforming. Conditional formatting applies these automatically so the dashboard updates itself when the underlying data changes. This sounds basic, but getting these fundamentals right is what makes a spreadsheet feel like a decision-support system rather than a data dump that someone has to interpret manually.

## Financial Modeling for Marketers

Marketing professionals who can build basic financial models have a significant edge in business conversations. Not because finance teams can't do it — they can and do — but because being able to model your own marketing ROI, budget allocation tradeoffs, and scenario analyses means you don't have to wait for someone else to validate your thinking. You show up to the conversation already having stress-tested your assumptions.

The core skills here aren't exotic: understanding how revenue flows from marketing investment, building a simple attribution model, and using INDEX-MATCH or XLOOKUP to pull data across worksheets without creating a brittle, formula-dependent mess. Learning to use SUMIFS for flexible conditional aggregation. Building dynamic named ranges that expand as new data is added. These are learnable with focused practice over a matter of weeks. The returns compound for years.

Excel isn't going anywhere, regardless of what the next generation of data tools looks like. The ability to think structurally, model assumptions explicitly, and present complex information clearly will remain foundational for as long as business decisions need to be justified to other humans. Excel is one of the best training grounds for exactly that kind of thinking — and for most marketing professionals, it's already sitting in their taskbar waiting to be used better than it currently is.

## The Compounding Value of Structured Thinking

The reason I keep coming back to Excel — even as I explore more sophisticated tools — is that it keeps my thinking honest. Every formula is a stated assumption. Every linked cell is a declared relationship. If your model breaks when you change an input, it tells you something about the structure of your logic. That kind of feedback loop is genuinely useful for developing the intellectual discipline that carries over into every analytical task, regardless of the tool.

For aspiring marketers and business professionals early in their careers, I'd say this: don't rush past Excel in your eagerness to learn more glamorous tools. Spend time in it. Build things that are more complex than you need. Figure out why models break and how to fix them. The patience and structured thinking you develop there will make you better at everything else — and it will show in how you approach problems long after you've moved on to other platforms.
