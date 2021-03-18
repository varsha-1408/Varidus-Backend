const startup_investor_Modal = () => {
  const modal = 
  {
	"type": "modal",
	"callback_id": "startup_investor_final",
	"title": {
		"type": "plain_text",
		"text": "Varidus Marketplace",
		"emoji": true
	},
	"submit": {
		"type": "plain_text",
		"text": "Submit",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "Cancel",
		"emoji": true
	},
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "Help us get you the best of the best by giving us few more details!",
				"emoji": true
			}
		},
		{
			"type": "input",
      "block_id": "msg_ClientBase",
			"element": {
				"type": "checkboxes",
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "B2B",
							"emoji": true
						},
						"value": "B2B"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "B2C",
							"emoji": true
						},
						"value": "B2C"
					}
				],
				"action_id": "checkboxes_action"
			},
			"label": {
				"type": "plain_text",
				"text": "What’s your client Base?",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "msg_Valuation",
			"element": {
				"type": "plain_text_input",
				"action_id": "Valuation",
        "placeholder": {
					"type": "plain_text",
					"text": "In dollars "
				}
			},
			"label": {
				"type": "plain_text",
				"text": "Valuation",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "msg_Revenue",
			"element": {
				"type": "plain_text_input",
				"action_id": "Revenue",
        "placeholder": {
					"type": "plain_text",
					"text": "In dollars "
				}
			},
			"label": {
				"type": "plain_text",
				"text": "Revenue",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "msg_RevenueGrowth",
			"element": {
				"type": "plain_text_input",
				"action_id": "RevenueGrowth"
			},
			"label": {
				"type": "plain_text",
				"text": "Revenue Growth (In percentage)",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "msg_EBITGrowth",
			"element": {
				"type": "plain_text_input",
				"action_id": "EBITGrowth"
			},
			"label": {
				"type": "plain_text",
				"text": "EBIT Growth (In percentage)",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "msg_MinimumAmount",
			"element": {
				"type": "plain_text_input",
				"action_id": "MinimumAmount"
			},
			"label": {
				"type": "plain_text",
				"text": "Minimum Amount to be raised (In $)",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "msg_Checkboxes",
			"element": {
				"type": "checkboxes",
				"action_id": "checkboxes_action",
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Family Office",
							"emoji": true
						},
						"value": "Family Office"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Angel Investor",
							"emoji": true
						},
						"value": "Angel Investor"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Venture Capital Fund",
							"emoji": true
						},
						"value": "Venture Capital Fund"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Incubator Or Accelerator",
							"emoji": true
						},
						"value": "Incubator Or Accelerator"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Crowd funding Platform",
							"emoji": true
						},
						"value": "Crowd funding Platform"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Self-funded",
							"emoji": true
						},
						"value": "Self-funded"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Government",
							"emoji": true
						},
						"value": "Government"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Private Equity",
							"emoji": true
						},
						"value": "Private Equity"
					}
				]
			},
			"label": {
				"type": "plain_text",
				"text": "Looking to raise funds from:",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "msg_Vertical",
			"element": {
				"type": "checkboxes",
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Auto Mobiles & Components",
							"emoji": true
						},
						"value": "Auto Mobiles & Components"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Banking & Financial Services",
							"emoji": true
						},
						"value": "Banking & Financial Services"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Edtech",
							"emoji": true
						},
						"value": "Edtech"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "FMCG",
							"emoji": true
						},
						"value": "FMCG"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Tourism & Hospitality",
							"emoji": true
						},
						"value": "Tourism & Hospitality"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Real Estate",
							"emoji": true
						},
						"value": "Real Estate"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Ecommerce",
							"emoji": true
						},
						"value": "Ecommerce"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Media & Entertainment",
							"emoji": true
						},
						"value": "Media & Entertainment"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Healthcare",
							"emoji": true
						},
						"value": "Healthcare"
					}
				],
				"action_id": "checkboxes_action"
			},
			"label": {
				"type": "plain_text",
				"text": "Select your Vertical/Industries",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "msg_Others1",
      "optional": true,
			"element": {
				"type": "plain_text_input",
				"action_id": "plain_text_input_action"
			},
			"label": {
				"type": "plain_text",
				"text": "Other ",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "msg_Ownership",
			"element": {
				"type": "checkboxes",
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Venture Capital",
							"emoji": true
						},
						"value": "Venture Capital"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Bootstrapped",
							"emoji": true
						},
						"value": "Bootstrapped"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Subsidiary",
							"emoji": true
						},
						"value": "Subsidiary"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Angel",
							"emoji": true
						},
						"value": "Angel"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Accelerator",
							"emoji": true
						},
						"value": "Accelerator"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Public",
							"emoji": true
						},
						"value": "Public"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Private Equity",
							"emoji": true
						},
						"value": "Private Equity"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Crowdfunded",
							"emoji": true
						},
						"value": "Crowdfunded"
					}
				],
				"action_id": "checkboxes_action"
			},
			"label": {
				"type": "plain_text",
				"text": "Select your Ownership",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "msg_Others2",
      "optional": true,
			"element": {
				"type": "plain_text_input",
				"action_id": "plain_text_input_action"
			},
			"label": {
				"type": "plain_text",
				"text": "Others",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "msg_Funding",
			"element": {
				"type": "checkboxes",
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Angel",
							"emoji": true
						},
						"value": "Angel"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Buyout",
							"emoji": true
						},
						"value": "Buyout"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Debt",
							"emoji": true
						},
						"value": "Debt"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Growth Equity",
							"emoji": true
						},
						"value": "Growth Equity"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "ICO",
							"emoji": true
						},
						"value": "ICO"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "IPO",
							"emoji": true
						},
						"value": "IPO"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Series A",
							"emoji": true
						},
						"value": "Series A"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Series B",
							"emoji": true
						},
						"value": "Series B"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Growth Capital(C-I)",
							"emoji": true
						},
						"value": "Growth Capital(C-I)"
					}
				],
				"action_id": "checkboxes_action"
			},
			"label": {
				"type": "plain_text",
				"text": "Select your Funding Stage",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "msg_Others3",
      "optional": true,        
			"element": {
				"type": "plain_text_input",
				"action_id": "plain_text_input_action"
			},
			"label": {
				"type": "plain_text",
				"text": "Other",
				"emoji": true
			}
		}
	]
};
        
        
  return modal;
};

module.exports = {startup_investor_Modal};