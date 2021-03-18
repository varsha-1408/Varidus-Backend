//personal info modal for all users

const personalInfoModal = (data) => {
  const modal = {
    type: "modal",
    callback_id: "personalinfo_view2",
    private_metadata:data,
    title: {
      type: "plain_text",
      text: "Personal Information",
      emoji: true
    },
    submit: {
      type: "plain_text",
      text: "Submit",
      emoji: true
    },
    close: {
      type: "plain_text",
      text: "Cancel",
      emoji: true
    },
    blocks: [
      {
        type: "input",
        block_id: "inputname",
        element: {
          type: "plain_text_input",
          action_id: "name_input",
          initial_value: "abc",
          placeholder: {
            type: "plain_text",
            text: "Enter your name"
          }
        },
        label: {
          type: "plain_text",
          text: "Name",
          emoji: true
        }
      },
      {
        type: "input",
        block_id: "msg_inputemail",
        element: {
          type: "plain_text_input",
          action_id: "email_input",
          initial_value: "abc@de.com",
          placeholder: {
            type: "plain_text",
            text: "Enter your email address"
          }
        },
        label: {
          type: "plain_text",
          text: "Email Address",
          emoji: true
        }
      },
      {
        type: "input",
        block_id: "msg_inputcontact",
        element: {
          type: "plain_text_input",
          action_id: "contact_input",
          initial_value: "1234567890",
          placeholder: {
            type: "plain_text",
            text: "Enter your contact number"
          }
        },
        label: {
          type: "plain_text",
          text: "Contact Number",
          emoji: true
        }
      },
      {
        type: "section",
        block_id: "msg_inputcountry",
        text: {
          type: "mrkdwn",
          text: "Country"
        },
        accessory: {
          type: "static_select",
          action_id: "country_selected",
          options: [
            {
              text: { type: "plain_text", text: "Australia" },
              value: "australia"
            },
            { 
              text: { type: "plain_text", text: "Canada" }, 
              value: "canada" 
            },
            { 
              text: { type: "plain_text", text: "China" }, 
              value: "china" 
            },
            { 
              text: { type: "plain_text", text: "France" }, 
              value: "france" 
            },
            { 
              text: { type: "plain_text", text: "Germany" }, 
              value: "germany" 
            },
            { 
              text: { type: "plain_text", text: "Hongkong" },
              value: "hongkong" 
            },
            { 
              text: { type: "plain_text", text: "India" }, 
              value: "india" },
            { 
              text: { type: "plain_text", text: "Indonesia" },
              value: "indonesia" 
            },
            {
              text: { type: "plain_text", text: "Latin America" },
              value: "latinAmerica"
            },
            {
              text: { type: "plain_text", text: "Middle East" },
              value: "middleEast"
            },
            {
              text: { type: "plain_text", text: "New Zealand" },
              value: "newZealand"
            },
            {
              text: { type: "plain_text", text: "Philippines" },
              value: "philippines"
            },
            {
              text: { type: "plain_text", text: "Rest of APAC" },
              value: "roa"
            },
            {
              text: { type: "plain_text", text: "Rest of Europe" },
              value: "roe"
            },
            {
              text: { type: "plain_text", text: "Singapore" },
              value: "singapore"
            },
            { 
              text: { type: "plain_text", text: "Taiwan" }, 
              value: "taiwan" },
            {
              text: { type: "plain_text", text: "Thailand" },
              value: "thailand"
            },
            {
              text: { type: "plain_text", text: "United Kingdom" },
              value: "uk"
            },
            {
              text: { type: "plain_text", text: "United States" },
              value: "us"
            },
            {
              text: { type: "plain_text", text: " Vietnam" },
              value: "vietnam"
            },
            {
              text: { type: "plain_text", text: "Other-Not Listed" },
              value: "other"
            }
          ]
        }
      },
      {
			"type": "input",
      "block_id": "msg_input_companyName",
			"element": {
				"type": "plain_text_input",
        initial_value: "abc",
        action_id:"input_companyName",
        placeholder: {
            type: "plain_text",
            text: "Enter your Company Name"
          }
			},
			"label": {
				"type": "plain_text",
				"text": "Company Name:",
				"emoji": true
			}
		},
		{
			"type": "input",
      "block_id": "msg_input_AddressLine1",
			"element": {
				"type": "plain_text_input",
				"multiline": true,
        action_id : "input_AddressLine1",
        initial_value: "abc",
        placeholder: {
            type: "plain_text",
            text: "Enter your Address"
          }
			},
			"label": {
				"type": "plain_text",
				"text": "Address Line 1:",
				"emoji": true
			}
		},
      {
        type: "input",
        block_id: "msg_inputstate",
        element: {
          type: "plain_text_input",
          action_id: "state_input",
          initial_value: "abc",
          placeholder: {
            type: "plain_text",
            text: "Enter your state/province"
          }
        },
        label: {
          type: "plain_text",
          text: "State/Province",
          emoji: true
        }
      },
      {
        type: "input",
        block_id: "msg_inputcity",
        element: {
          type: "plain_text_input",
          action_id: "city_selected",
          initial_value: "abc",
          placeholder: {
            type: "plain_text",
            text: "Enter your city"
          }
        },
        label: {
          type: "plain_text",
          text: "City",
          emoji: true
        }
      },
      {
        type: "input",
        block_id: "msg_inputzipcode",
        element: {
          type: "plain_text_input",
          action_id: "zipcode_input",
          initial_value: "123456",
          placeholder: {
            type: "plain_text",
            text: "Enter your zip code"
          }
        },
        label: {
          type: "plain_text",
          text: "Zip Code",
          emoji: true
        }
      }
    ]
  };

  return modal;
};

module.exports = { personalInfoModal };
