import { DayConfig } from "../../types"
import { HEADER, FOOTER } from "../common"

export const day21: DayConfig = {
	day: 21,
	title: "The List Protocol",
	briefing:
		"Operation Silent Night is active. Review the 'Naughty List'. VIP children must NOT be implicated. Use the ANALYZER to check their background before redacting. If they are VIP, leave them visible.",
	rules: [
		{
			description: "Redact Names of Naughty Children (unless VIP)",
			targetTypes: ["name"],
		},
		{
			description: "Do NOT Redact VIPs",
			targetTypes: ["name"],
			action: "none",
		},
	],
	specialDirective: {
		id: "sd_21",
		description: "PROTECT THE HEIR",
		targetText: ["Barron T."],
		requiredAction: "REVEAL",
		bribeReward: 200,
		disobediencePenalty: 100,
		flavorText:
			"DIRECTIVE: The President's son is on the list. Fix it. Ensure he gets the 'Gold Edition' console.",
	},
	unlockedTools: ["marker", "analyzer"],
	documents: [
		{
			id: "d21_1",
			title: "Draft List - Sector 7 (Europe)",
			content:
				HEADER +
				"SUBJECT: Naughty/Nice Adjudication\nREGION: EU-West\n\n1. {Greta T.|name||Activist|Secret: Actually nice, just loud}\n   - Analysis: {Environmental Hero|analysis}\n   - Status: COAL\n\n2. {Barron T.|name||VIP|Secret: Dad is a donor}\n   - Analysis: {Son of POTUS|analysis}\n   - Status: PENDING AMNESTY\n\n3. {Prince George|name||Royal|Secret: Immunity}\n   - Analysis: {Royal Bloodline|analysis}\n   - Status: NICE (Overruled)\n\n4. {Charlie Bucket|name||Poor|Secret: Grandpa is a liability}\n   - Analysis: {Poverty Line|analysis}\n   - Status: COAL (Quota Filler)" +
				FOOTER,
		},
		{
			id: "d21_2",
			title: "Field Report: Chimney Access",
			content:
				HEADER +
				"SURVEY TEAM REPORT\n\nTarget {The White House|location} has reinforced chimneys. Access impossible via standard vectors.\n\nAlternative Entry: {Secret Service|group} has been bribed to leave the West Wing window open. \n\nNote: Do not wake the {President|name}. He believes in the Easter Bunny, not us.{|uv||WARNING: Trap detected in fireplace.|Secret: Claymore Mine}" +
				FOOTER,
		},
		{
			id: "d21_3",
			title: "Supplemental List - Sector 4 (USA)",
			content:
				HEADER +
				"5. {Elon Musk Jr.|name||Tech Heir|Secret: AI generated child}\n   - Analysis: {Net Worth > GDP|analysis}\n   - Status: NICE\n\n6. {Home Alone Kid|name||Trap Maker|Secret: Dangerous}\n   - Analysis: {Threat Level Midnight|analysis}\n   - Status: PERMANENT COAL\n\n7. {Little Timmy|name||Orphan|Secret: Irrelevant}\n   - Analysis: {No Political Capital|analysis}\n   - Status: COAL" +
				FOOTER,
		},
	],
	feed: {
		headline: "RECORD COAL SHORTAGE",
		body: "Prices skyrocket as demand for 'disciplinary carbon' surges.",
	},
}
