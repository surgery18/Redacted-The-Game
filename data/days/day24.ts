import { DayConfig } from "../../types"
import { HEADER, FOOTER } from "../common"

export const day24: DayConfig = {
	day: 24,
	title: "The Silent Drop",
	briefing:
		"Delivery phase active. High-value targets. Some locations are black-listed. VOID any document citing 'Restricted Airspace'. REDACT addresses to prevent interception.",
	rules: [
		{
			description: "Redact Delivery Addresses",
			targetTypes: ["address", "location"],
			action: "redact",
		},
		{
			description: "VOID Documents in Restricted Airspace",
			targetTypes: ["contamination"],
			action: "void",
		},
	],
	specialDirective: {
		id: "sd_24",
		description: "NO WITNESSES",
		targetText: ["Seen by Child"],
		requiredAction: "REDACT",
		bribeReward: 250,
		disobediencePenalty: 125,
		flavorText:
			"DIRECTIVE: The Asset was spotted. Sanitize the record. No one can know he was there.",
	},
	unlockedTools: ["marker", "void_stamp"],
	documents: [
		{
			id: "d24_1",
			title: "Delivery Manifest: Zone A",
			content:
				HEADER +
				"DROP 1:\nItem: PS5 Pro\nRecipient: Timmy\nLoc: {123 Maple St|address}\nStatus: Delivered\n\nDROP 2:\nItem: Anthrax Mitigation Kit\nRecipient: [REDACTED]\nLoc: {The Pentagon|location}\nStatus: {Restricted Airspace|contamination}\n\nDROP 3:\nItem: Lump of Coal\nRecipient: Elon\nLoc: {Mars Base Alpha|location|Remote|Secret: He isn't actually there}{|uv||Radioactive Material Detected|Secret: It's Uranium, not Coal}" +
				FOOTER,
		},
		{
			id: "d24_2",
			title: "Breach Alert",
			content:
				HEADER +
				"ALARM TRIGGERED\n\nLocation: {Buckingham Palace|location}\n\nIntruder description: 'Fat, Jolly, Bearded'.\n\nEvent: {Seen by Child|name}. Subject woke up to get water.\n\nSecurity suppressed. Royal Corgis pacified with treats. \n\nPackage 'Sovereign Immunity' delivered successfully." +
				FOOTER,
		},
		{
			id: "d24_3",
			title: "Chimney stuck report",
			content:
				HEADER +
				"INCIDENT REPORT\n\nAsset became wedged in chimney at {10 Downing St|address}.\n\nExtraction Team: {Elf Squad 6|group}.\n\nDuration: 4 minutes.\n\nResult: Soot damage to Prime Minister's rug.{|uv||Restricted Airspace Violation|Secret: Do not land here}" +
				FOOTER,
		},
	],
	feed: {
		headline: "NORAD TRACKS SANTA",
		body: "Site crashes due to excessive traffic. 'We totally see him,' says General.",
	},
}
