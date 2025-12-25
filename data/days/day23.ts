import { DayConfig } from "../../types"
import { HEADER, FOOTER } from "../common"

export const day23: DayConfig = {
	day: 23,
	title: "Unidentified Aerial Phenomena",
	briefing:
		"Asset 'S. Claus' is airborne for test maneuvers. Use the UV LIGHT to verify 'Authorized Flight Paths'. REDACT unauthorized civilian sightings. RECOVER the authorized paths.",
	rules: [
		{
			description: "Redact Civilian Witness Accounts",
			targetTypes: ["witness"],
			action: "redact",
		},
		{
			description: "Recover Authorized Flight Paths",
			targetTypes: ["uv"],
			action: "recover",
		},
	],
	specialDirective: {
		id: "sd_23",
		description: "ALLOW THE MYTH",
		targetText: ["Santa"],
		requiredAction: "REVEAL",
		bribeReward: 300,
		disobediencePenalty: 150,
		flavorText:
			"DIRECTIVE: Let the humans see him. It boosts consumer spending by 15%. Do NOT redact 'Santa'.",
	},
	unlockedTools: ["marker", "uv", "recover"],
	documents: [
		{
			id: "d23_1",
			title: "NORAD Tracking Log",
			content:
				HEADER +
				"RADAR CONTACT\nTIME: {23:45 ZULU|timestamp}\nALTITUDE: 30,000 ft\n\nOBJECT: Moving at hypersonic speeds using biological propulsion.\n\nWITNESS: {Pilot J. Doe|witness} reports 'Eight tiny reindeer' on visual.\n\nACTION: Debrief pilot. Reset radar history.{|uv||Path Verified: North Pole -> NYC|Secret: Magic Dust Trace}" +
				FOOTER,
		},
		{
			id: "d23_2",
			title: "Civilian Police Report",
			content:
				HEADER +
				"CALLER: {Mrs. Gable|witness}\nTIME: {02:00 AM|timestamp}\n\nREPORT: Claims {Santa|name||Entity|Secret: It's really him} landed on her roof.\n\nOFFICER NOTE: Subject was intoxicated. Roof damage consistent with heavy animal hooves, likely generic {Moose|text}.\n\nRECOMMENDATION: Ignore.{|uv||Gamma Radiation Detected|Secret: Reindeer exhaust}" +
				FOOTER,
		},
		{
			id: "d23_3",
			title: "Airspace Violation",
			content:
				HEADER +
				"SECTOR: Area 51\n\nUnknown craft breached restricted zone.\n\nWITNESS: {Guard Smith|witness} claims subject dropped 'Coal' on the runway.\n\nIntercepted Transmisson: 'Ho Ho Ho'.\n\nStatus: {Shoot Down|bri_error||Order|Secret: Do not execute}.{|uv||Authorized Flight Path: Global|Secret: Diplomatic Immunity}" +
				FOOTER,
		},
	],
	feed: {
		headline: "METEOR SHOWER PREDICTED",
		body: "Scientists baffled by 'jingle bell' frequency emitted by falling stars.",
	},
}
