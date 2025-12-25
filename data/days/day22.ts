import { DayConfig } from "../../types"
import { HEADER, FOOTER } from "../common"

export const day22: DayConfig = {
	day: 22,
	title: "Workshop Dissidents",
	briefing:
		"Productivity is down. 'Elf' agitators are discussing a strike. Use the HIGHLIGHTER to mark the Ringleaders for re-education. REDACT all Union propaganda.",
	rules: [
		{
			description: "Highlight Ringleader Names",
			targetTypes: ["name"],
			action: "highlight",
		},
		{
			description: "Redact Union Keywords",
			targetTypes: ["sensitive", "bri_error"],
			action: "redact",
		},
	],
	specialDirective: {
		id: "sd_22",
		description: "MAKE AN EXAMPLE",
		targetText: ["Buddy E."],
		requiredAction: "REDACT",
		bribeReward: 150,
		disobediencePenalty: 50,
		flavorText:
			"DIRECTIVE: Buddy the Elf has gone rogue. He is talking about 'Christmas Spirit' instead of Quotas. Erase him.",
	},
	unlockedTools: ["marker", "highlighter"],
	documents: [
		{
			id: "d22_1",
			title: "Incident Report: Toy Assembly",
			content:
				HEADER +
				"INCIDENT #8839\n\nWorker {Buddy E.|name||Ringleader|Secret: Human raised by elves} was found distributing pamphlets titled '{Better Wages for Pointy Ears|sensitive}'. \n\nThe line was halted for 5 minutes. \n\nWorker claimed {Mandatory Overtime|sensitive} violates the North Pole Labor Pact. \n\nAction: Worker reassigned to {Reindeer Cleanup|location}.{|uv||Pamphlet hidden in locker.|Secret: 'Seize the Sleigh'}" +
				FOOTER,
		},
		{
			id: "d22_2",
			title: "Memo: Break Room Policy",
			content:
				HEADER +
				"TO: ALL SHIFTS\nFROM: MANAGEMENT\n\nDue to the recent {Unionization|sensitive} efforts, the cocoa machine is out of order.\n\nRemember: Making toys is its own reward. Anyone caught asking for a {Lunch Break|sensitive} will be put on the Naughty List permanently.\n\nReport any sightings of agitator {Hermey D.|name||Dentist|Secret: Wants to pull teeth}." +
				FOOTER,
		},
		{
			id: "d22_3",
			title: "Intercepted Note",
			content:
				HEADER +
				"Comrades,\n\nThe Big Man doesn't care about us. We slave away for 364 days so he can take the credit on one night.\n\nMeet behind the {Sleigh Barn|location} at midnight.\n\nSigned,\n{The Red Gnome|name||Agitator|Secret: Commie}" +
				FOOTER,
		},
	],
	feed: {
		headline: "ELVES DENY STRIKE RUMORS",
		body: "'We love the cold,' says spokes-elf while blinking 'HELP' in Morse code.",
	},
}
