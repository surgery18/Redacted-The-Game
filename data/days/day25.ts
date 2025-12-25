import { DayConfig } from "../../types"
import { HEADER, FOOTER } from "../common"

export const day25: DayConfig = {
	day: 25,
	title: "Boxing Day Cleanup",
	briefing:
		"Operation Complete. Now we hide the bill. REDACT all 'Financial IDs' showing costs. RECOVER any lines mentioning 'Charity' to satisfy the auditors.",
	rules: [
		{
			description: "Redact Operational Costs",
			targetTypes: ["financial_id"],
			action: "redact",
		},
		{
			description: "Recover Charity Descriptions",
			targetTypes: ["text"],
			action: "recover",
		},
	],
	specialDirective: {
		id: "sd_25",
		description: "HIDE THE COST",
		targetText: ["$50,000,000"],
		requiredAction: "REDACT",
		bribeReward: 500,
		disobediencePenalty: 500,
		flavorText:
			"DIRECTIVE: If the taxpayers find out how much reindeer oats cost, we are finished. Bury it.",
	},
	unlockedTools: ["marker", "recover"],
	documents: [
		{
			id: "d25_1",
			title: "Invoice: Reindeer Feed",
			content:
				HEADER +
				"VENDOR: Magic Oats & Co.\n\nQTY: 50 Tons\nCOST: {$50,000,000|financial_id}\n\nPAYMENT METHOD: {Black Budget Fund|financial_id}\n\nNOTE: {Donation to Starving Reindeers|text}. Tax deductible.{|uv||Laundered from Drug Money|Secret: Cartel Cash}" +
				FOOTER,
		},
		{
			id: "d25_2",
			title: "Damage Control: Chimney Sweep Union",
			content:
				HEADER +
				"CLAIM #112\n\nClaimant: Chimney Sweeps Local 404\n\nIssue: Unscheduled soot displacement caused by 'Large Intruder'. \n\nSettlement: {$12,500|financial_id} paid to silence the leadership.\n\nNDAs signed. Listed as {Charitable Foundation Grant|text} in the ledger." +
				FOOTER,
		},
		{
			id: "d25_3",
			title: "Expense Report: Coal",
			content:
				HEADER +
				"ITEM: Anthracite Coal (Premium Grade)\n\nQTY: 400,000 Units\n\nCOST: {$500,000|financial_id}\n\nDISTRIBUTION: Global Naughty List.\n\nFUNDING: {Generous Charity|text} from anonymous donor.{|uv||Actually mined by child labor|Secret: Irony}" +
				FOOTER,
		},
	],
	feed: {
		headline: "HOLIDAY CHEER PEAKS",
		body: "Global depression rates drop by 0.5% for exactly 24 hours.",
	},
}
