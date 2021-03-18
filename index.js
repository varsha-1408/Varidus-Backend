// where your node app starts
// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.

//Requiring packages
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const qs = require("qs");
const { WebClient, ErrorCode } = require("@slack/web-api");
const app = express();
const apiUrl = "https://slack.com/api";
const token = process.env.SLACK_BOT_TOKEN;
const web = new WebClient(token);
const mongoose = require("mongoose");
const delay = require("delay");
const MongoClient = require("mongodb").MongoClient;

const signature = require("./verifySignature");
const introPage = require("./frontend/introPage");

// Requiring frontend pages (Personal Info - common to all)
const personalInfo = require("./frontend/personalInfo/personalInfo.js");

// Requiring frontend pages (Startups looking for Investors)
const Startup_investor = require("./frontend/startup_investor/startup_investor");

// Requiring frontend pages (Startups looking for Service providers)
const Startup_provider = require("./frontend/startup_provider/startup_provider");

// Requiring frontend pages (Service providers looking for Startups)
const ServiceProvider = require("./frontend/serviceProvider/serviceProvider");

// Requiring frontend pages (Investor looking for Startups)
const Investor = require("./frontend/investor/investor.js");

// Requiring frontend pages (Dashboard)
const dashboard_startup_funds = require("./frontend/returning_user/dashboard_startup_funds.js");
const dashboard_startup_provider = require("./frontend/returning_user/dashboard_startup_provider.js");
const dashboard_service_provider = require("./frontend/returning_user/dashboard_service_provider.js");
const dashboard_investor = require("./frontend/returning_user/dashboard_investor.js");

//Requiring Controller(database part)
const userInfo = require("./controller/userInfo.js");
const startup_investor_C = require("./controller/startup_investor.js");
const serviceProvider_C = require("./controller/service_provider.js");
const startup_provider_C = require("./controller/startup_provider.js");
const investor_C = require("./controller/investor.js");
const existingUser = require("./controller/existingUser.js");

//Requiring countries
const findRegion = require("./findRegion.js");

//defining variables needed
var country;
var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
var invalidContact = "",
  invalidEmail = "";

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Acess-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});
const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
};
app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));
app.use(bodyParser.urlencoded({ extended: true }));

// Conection to MongoDB Atlas (Project 1)
mongoose
  .connect(
    "mongodb+srv://marketplace:4kvuTzMdQNy5kLXW@cluster0.mpbog.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  .catch(error => {
    console.log(error);
  });
mongoose.Promise = global.Promise;

// Displaying home page
app.post("/slack/events", async (req, res) => {
  switch (req.body.type) {
    case "url_verification": {
      // verify Events API endpoint by returning challenge if present
      res.send({ challenge: req.body.challenge });
      break;
    }

    case "event_callback": {
      // Verify the signing secret
      if (!signature.isVerified(req)) {
        res.sendStatus(404);
        return;
      }

      // Request is verified --
          // Checking if the user exists in the database
        else {
        const { type, user, channel, tab, text, subtype } = req.body.event;
        // Triggered when the App Home is opened by a user
        res.send({
          response_action: "clear"
        });

        // Display App Home
        if (type === "app_home_opened") {
          var exist = await existingUser.login(user);
          console.log(exist.db_sCategory);

          // Directing to intro page if user doesnt exist
          if (!exist) {
            try {
              (async () => {
                const result = await web.views.publish({
                  token: process.env.SLACK_BOT_TOKEN,
                  user_id: user,
                  view: introPage.introPage()
                });
              })();
            } catch (e) {
              console.log(e);
            }
          }

          // Directing users to their respective dashboards if user exists
          else {
            if (exist.db_sCategory == "startup_funds") {
              (async () => {
                const result = await web.views.publish({
                  token: process.env.SLACK_BOT_TOKEN,
                  user_id: user,
                  view: dashboard_startup_funds.startup_funds()
                });
              })();
            } else if (exist.db_sCategory == "startup_provider") {
              (async () => {
                const result = await web.views.publish({
                  token: process.env.SLACK_BOT_TOKEN,
                  user_id: user,
                  view: dashboard_startup_provider.startup_provider()
                });
              })();
            } else if (exist.db_sCategory == "service_provider") {
              (async () => {
                const result = await web.views.publish({
                  token: process.env.SLACK_BOT_TOKEN,
                  user_id: user,
                  view: dashboard_service_provider.service_provider()
                });
              })();
            } else if (exist.db_sCategory == "investor") {
              // startup_investor_C.matchStartups().then(res1 => {resultdata = res1[0]}).catch((err) => {console.log(err)})

              (async () => {
                var resultdata = await startup_investor_C.matchStartups();
                const result = await web.views.publish({
                  token: process.env.SLACK_BOT_TOKEN,
                  user_id: user,
                  view: dashboard_investor.investor(resultdata)
                });
              })();
            }
          }
        }
      }
      break;
    }
    // default {
    //   res.sendStatus(404);
    // }
  }
});

// Handling interactive components
// Slack requires every interactive call to respond within 3 seconds, otherwise user will see an error msg
// Read how to handle user interactions here - https://api.slack.com/interactivity/handling

app.post("/slack/interactive", async (req, res) => {
  const { token, trigger_id, user, actions, type, view } = JSON.parse(
    req.body.payload
  );

  // On choosing dropdown options in Intro page
  if (actions && actions[0].action_id.match(/user_type_selected/)) {
    res.sendStatus(200);
    if (actions[0].selected_option.value === "startup_funds") {
      (async () => {
        const result = await web.views.open({
          token: process.env.SLACK_BOT_TOKEN,
          trigger_id: trigger_id,
          view: personalInfo.personalInfoModal(actions[0].selected_option.value)
        });
      })();
    } else if (actions[0].selected_option.value === "startup_provider") {
      (async () => {
        const result = await web.views.open({
          token: process.env.SLACK_BOT_TOKEN,
          trigger_id: trigger_id,
          view: personalInfo.personalInfoModal(actions[0].selected_option.value)
        });
      })();
    } else if (actions[0].selected_option.value === "service_provider") {
      (async () => {
        const result = await web.views.open({
          token: process.env.SLACK_BOT_TOKEN,
          trigger_id: trigger_id,
          view: personalInfo.personalInfoModal(actions[0].selected_option.value)
        });
      })();
    } else if (actions[0].selected_option.value === "investor") {
      (async () => {
        const result = await web.views.open({
          token: process.env.SLACK_BOT_TOKEN,
          trigger_id: trigger_id,
          view: personalInfo.personalInfoModal(actions[0].selected_option.value)
        });
      })();
    }
  }

  // catch country
  if (actions && actions[0].action_id.match(/country_selected/)) {
    country = actions[0].selected_option.value;
    res.sendStatus(200);
  }

  // On submiting Personal Info modal
  if (type === "view_submission" && view.callback_id === "personalinfo_view2") {
    invalidContact = "";
    invalidEmail = "";

    const { user, view } = JSON.parse(req.body.payload);
    const data = {
      name: view.state.values.inputname.name_input.value,
      email: view.state.values.msg_inputemail.email_input.value,
      phone: view.state.values.msg_inputcontact.contact_input.value,
      country: country,
      companyName: view.state.values.msg_input_companyName.input_companyName.value,
      addressLine1: view.state.values.msg_input_AddressLine1.input_AddressLine1.value,
      state: view.state.values.msg_inputstate.state_input.value,
      city: view.state.values.msg_inputcity.city_selected.value,
      zipcode: view.state.values.msg_inputzipcode.zipcode_input.value,
      subcategory: view.private_metadata
    };

    if (data.phone.toString().length != 10) {
      invalidContact = "Incorrect contact number";
    }
    if (mailformat.test(data.email) == false) {
      invalidEmail = "Incorrect email id";
    }
    if (invalidContact || invalidEmail) {
      res.send({
        response_action: "errors",
        errors: {
          msg_inputcontact: invalidContact,
          msg_inputemail: invalidEmail
        }
      });
    } else {
      res.send("");
      // res.sendStatus(200);
      await userInfo.register(user.id, data);

      if (view.private_metadata === "startup_funds") {
        (async () => {
          const result = await web.views.open({
            token: process.env.SLACK_BOT_TOKEN,
            trigger_id: trigger_id,
            view: Startup_investor.startup_investor_Modal()
          });
        })();
      } else if (view.private_metadata === "startup_provider") {
        (async () => {
          const result = await web.views.open({
            token: process.env.SLACK_BOT_TOKEN,
            trigger_id: trigger_id,
            view: Startup_provider.startup_provider_Modal()
          });
        })();
      } else if (view.private_metadata === "service_provider") {
        (async () => {
          const result = await web.views.open({
            token: process.env.SLACK_BOT_TOKEN,
            trigger_id: trigger_id,
            view: ServiceProvider.serviceProvider_Modal()
          });
        })();
      } else if (view.private_metadata === "investor") {
        (async () => {
          const result = await web.views.open({
            token: process.env.SLACK_BOT_TOKEN,
            trigger_id: trigger_id,
            view: Investor.investor_Modal()
            //view: startup_investor_Modal3.startup_investor3()
          });
        })();
      }
      // res.sendStatus(200);
    }
  }

  // On submitting the form for startups (looking for investors)
  if ( type === "view_submission" && view.callback_id === "startup_investor_final") {
    
    res.send("");
    const { token, trigger_id, user, actions, type, view } = JSON.parse(
      req.body.payload
    );
    //pushing selected checkbox values to an array (checkbox template)
    var From1 = [],
      From2 = [],
      From3 = [],
      From4 = [],
      From5 = [];
    var List1 = [],
      List2 = [],
      List3 = [],
      List4 = [],
      List5 = [];
    From1 = view.state.values.msg_Checkboxes.checkboxes_action.selected_options;
    From2 = view.state.values.msg_Vertical.checkboxes_action.selected_options;
    From3 = view.state.values.msg_Ownership.checkboxes_action.selected_options;
    From4 = view.state.values.msg_Funding.checkboxes_action.selected_options;
    From5 = view.state.values.msg_ClientBase.checkboxes_action.selected_options;

    //FundsFrom checkbox
    for (var i = 0; i < From1.length; i++) {
      List1.push(From1[i].value);
    }
    //Vertical checkbox
    for (var i = 0; i < From2.length; i++) {
      List2.push(From2[i].value);
    }
    if (view.state.values.msg_Others1.plain_text_input_action.value) {
      List2.push(view.state.values.msg_Others1.plain_text_input_action.value);
    }
    //Ownership checkbox
    for (var i = 0; i < From3.length; i++) {
      List3.push(From3[i].value);
    }
    if (view.state.values.msg_Others2.plain_text_input_action.value) {
      List3.push(view.state.values.msg_Others2.plain_text_input_action.value);
    }
    //Funding checkbox
    for (var i = 0; i < From4.length; i++) {
      List4.push(From4[i].value);
    }
    if (view.state.values.msg_Others3.plain_text_input_action.value) {
      List4.push(view.state.values.msg_Others3.plain_text_input_action.value);
    }
    //ClientBase checkbox
    for (var i = 0; i < From5.length; i++) {
      List5.push(From5[i].value);
    }

    const data = {
      ClientBase: List5,
      Valuation: view.state.values.msg_Valuation.Valuation.value,
      Revenue: view.state.values.msg_Revenue.Revenue.value,
      RevenueGrowth: view.state.values.msg_RevenueGrowth.RevenueGrowth.value,
      EBITGrowth: view.state.values.msg_EBITGrowth.EBITGrowth.value,
      MinimumAmount: view.state.values.msg_MinimumAmount.MinimumAmount.value,
      FundsFrom: List1,
      Vertical: List2,
      OwnershipCriteria: List3,
      FundingStage: List4
    };

    await startup_investor_C.register(user.id, data);

    (async () => {
      const result = await web.views.publish({
        token: process.env.SLACK_BOT_TOKEN,
        user_id: user.id,
        view: dashboard_startup_funds.startup_funds()
      });
    })();
  }

  // On submitting the form for service providers
  if (type === "view_submission" && view.callback_id === "serviceProvider2") {
    
    res.send("");
    const { token, trigger_id, user, actions, type, view } = JSON.parse(
      req.body.payload
    );

    //pushing selected checkbox values to an array (checkbox template)
    var From1 = [],
      From2 = [],
      From3 = [],
      From4 = [];
    var List1 = [],
      List2 = [],
      List3 = [],
      List4 = [];
    From1 = view.state.values.msg_ClientBase.checkboxes_action.selected_options;
    From2 = view.state.values.msg_Services.checkboxes_action.selected_options;
    From3 = view.state.values.msg_Location.checkboxes_action.selected_options;
    From4 = view.state.values.msg_Type.checkboxes_action.selected_options;

    //ClientBase
    for (var i = 0; i < From1.length; i++) {
      List1.push(From1[i].value);
    }
    //Services
    for (var i = 0; i < From2.length; i++) {
      List2.push(From2[i].value);
    }
    //Locations
    for (var i = 0; i < From3.length; i++) {
      List3.push(From3[i].value);
    }
    //PatnerType
    for (var i = 0; i < From4.length; i++) {
      List4.push(From4[i].value);
    }

    const data = {
      ClientBase: List1,
      ProviderType: List4,
      Services: List2,
      Locations: List3
    };
    // res.sendStatus(200);
    await serviceProvider_C.register(user.id, data);

    (async () => {
      const result = await web.views.publish({
        token: process.env.SLACK_BOT_TOKEN,
        user_id: user.id,
        view: dashboard_service_provider.service_provider()
      });
    })();
  }

  // On submitting the form for startups (looking for service providers)
  if (type === "view_submission" && view.callback_id === "startup_provider2") {
    
    res.send("");
    const { token, trigger_id, user, actions, type, view } = JSON.parse(
      req.body.payload
    );

    //pushing selected checkbox values to an array (checkbox template)
    var From1 = [],
      From2 = [],
      From3 = [],
      From4 = [];
    var List1 = [],
      List2 = [],
      List3 = [],
      List4 = [];
    From1 = view.state.values.msg_ClientBase.checkboxes_action.selected_options;
    From2 = view.state.values.msg_Services.checkboxes_action.selected_options;
    From3 = view.state.values.msg_Location.checkboxes_action.selected_options;
    From4 = view.state.values.msg_Type.checkboxes_action.selected_options;

    //ClientBase
    for (var i = 0; i < From1.length; i++) {
      List1.push(From1[i].value);
    }
    //Services
    for (var i = 0; i < From2.length; i++) {
      List2.push(From2[i].value);
    }
    //Locations
    for (var i = 0; i < From3.length; i++) {
      List3.push(From3[i].value);
    }
    //PatnerType
    for (var i = 0; i < From4.length; i++) {
      List4.push(From4[i].value);
    }

    const data = {
      ClientBase: List1,
      Services: List2,
      Locations: List3,
      PartnerType: List4
    };
    // res.sendStatus(200);
    await startup_provider_C.register(user.id, data);

    (async () => {
      const result = await web.views.publish({
        token: process.env.SLACK_BOT_TOKEN,
        user_id: user.id,
        view: dashboard_startup_provider.startup_provider()
      });
    })();
  }

  // On submitting the form for investors

  if (type === "view_submission" && view.callback_id === "investor2") {
    
    res.send("");
    const { token, trigger_id, user, actions, type, view } = JSON.parse(
      req.body.payload
    );

    //pushing selected checkbox values to an array (checkbox template)
    var From1 = [],
      From2 = [],
      From3 = [],
      From4 = [];
    var List1 = [],
      List2 = [],
      List3 = [],
      List4 = [];
    From1 = view.state.values.msg_Clients.checkboxes_action.selected_options;
    From2 = view.state.values.msg_Vertical.checkboxes_action.selected_options;
    From3 = view.state.values.msg_Ownership.checkboxes_action.selected_options;
    From4 = view.state.values.msg_Funding.checkboxes_action.selected_options;

    for (var i = 0; i < From1.length; i++) {
      List1.push(From1[i].value);
    }
    //Vertical
    for (var i = 0; i < From2.length; i++) {
      List2.push(From2[i].value);
    }
    if (view.state.values.msg_Others1.plain_text_input_action.value) {
      List2.push(view.state.values.msg_Others1.plain_text_input_action.value);
    }
    //Ownership
    for (var i = 0; i < From3.length; i++) {
      List3.push(From3[i].value);
    }
    if (view.state.values.msg_Others2.plain_text_input_action.value) {
      List3.push(view.state.values.msg_Others2.plain_text_input_action.value);
    }
    //Funding
    for (var i = 0; i < From4.length; i++) {
      List4.push(From4[i].value);
    }
    if (view.state.values.msg_Others3.plain_text_input_action.value) {
      List4.push(view.state.values.msg_Others3.plain_text_input_action.value);
    }

    const data = {
      InvestorType: view.state.values.msg_InvestorType.radio_buttons_action.selected_option.value,
      MininumAmount: view.state.values.msg_Min.plain_text_input_action.value,
      MaximumAmount: view.state.values.msg_Max.plain_text_input_action.value,
      Clients: List1,
      Vertical: List2,
      Ownership: List3,
      FundingStage: List4
    };
    // res.sendStatus(200);
    await investor_C.register(user.id, data);

    (async () => {
      const result = await web.views.publish({
        token: process.env.SLACK_BOT_TOKEN,
        user_id: user.id,
        view: dashboard_investor.investor()
      });
    })();
    //    view_dashboard();
  }

  // Displaying user profile
  //   if (actions && actions[0].action_id.match(/profileangelbtn/)) {
  //     res.sendStatus(200);
  //     var res1 = await existingUser.login(user.id);
  //       (async () => {
  //         // Update a modal
  //         const result = await web.views.open({
  //           token: process.env.SLACK_BOT_TOKEN,
  //           trigger_id: trigger_id,
  //           view: companyProfile.companyProfile(res1)
  //         });
  //       })();
  //   }
  
}); // end slack/interactive

/* Running Express server */
// const server = app.listen(5000, () => {
//   console.log('Express web server is running on port %d in %s mode', server.address().port, app.settings.env);
// });
app.listen(process.env.PORT || 3000);

app.get("/", async (req, res) => {
  res.send(
    'There is no web UI for this code sample. To view the source code, click "View Source"'
  );
});

// Function to delete all collections in the database (for development purposes only)
app.get("/deltest", (req, res) => {
  MongoClient.connect(
    "mongodb+srv://marketplace:4kvuTzMdQNy5kLXW@cluster0.mpbog.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    (err, client) => {
      if (err) throw err;
      console.log("Connected...");
      const db = client.db("test");

      var collectionList = [];

      db.listCollections().toArray(function(err, collInfos) {
        for (var ab = 0; ab < Object.keys(collInfos).length; ab++) {
          collectionList.push(collInfos[ab].name);
        }
        console.log(collectionList.length);
        console.log(collectionList);
        for (var ac = 0; ac <= collectionList.length; ac++) {
          db.collection(collectionList[ac]).drop(function(err, delOK) {
            if (err) {
              throw err;
              res.send("Error");
            }
            if (delOK) {
              console.log("Collection " + collectionList[ac] + " deleted");
            }
          });
        }
        res.send(collectionList);
      });

      client.close();
    }
  );
});
