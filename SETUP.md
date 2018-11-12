In just a few steps, you can set up IFTTT to add a To-Do in Habitica:

# Set up the .env file in Glitch

Go to your [Habitica API settings](https://habitica.com/#/options/settings/api) to obtain your user ID and API token. Paste these as the values for `HABITICA_USER` and `HABITICA_API_KEY` in the `.env` file. The `.env` file is private and only visible to you unless you specifically invite a collaborator to edit your code.

For `GLITCH_APP_KEY`, make up a string of letters and numbers you will use in your request to help prevent random people from triggering this action. You can use [random.org](https://www.random.org/passwords/?num=5&len=16&format=html&rnd=new) or a similar site to help you generate this.

# Triggering your Habitica action from IFTTT

In IFTTT, create a new applet by selecting 'New Applet'.

For the 'if' condition/trigger, select any service you want to use to add a To-Do in Habitica. In this example, I use Google Assistant.

![Example of creating Google Assistant trigger](https://cdn.glitch.com/98d7e0eb-a328-4feb-9f6b-48eb446dc509%2Fadd-via-google.PNG?1494338568356)

For the 'then' condition/action, search for and select 'Maker Webhooks' and use the 'Make a web request' action. Set the URL to your Glitch project URL - this has the format of `https://project-name.glitch.me/`, so in this example I used `https://habitica-ifttt-action.glitch.me`. Set the Method to `POST` and Content Type to `application/x-www-form-urlencoded`. 

In the Body, use the following format to send the title of your To-Do and the `GLITCH_APP_KEY` you created in your `.env` file: `title=ingredient-for-title&key=your-key`. In this Google Assistant example, the ingredient I want to use for the title of the task is `TextField`, but the ingredients will be different depending on the trigger you use.

![Example of creating Maker Webhooks action](https://cdn.glitch.com/98d7e0eb-a328-4feb-9f6b-48eb446dc509%2Fpost-to-glitch.PNG?1494338572116)


Now when that service triggers, Glitch will receive a request. The Glitch app will check to make sure that the key you sent matches the `GLITCH_APP_KEY` in your `.env` file, then it will make an API request to Habitica to add a To-Do with the title you specified. Refresh your Tasks and you should see your new To-Do item!

# Some other ideas

Create a To-Do in Habitica when:

* You forward an email to IFTTT tagged #habitica
* You bookmark content in Code School so you'll remember to come back to it
* Automatic detects your check engine light has turned on so you'll remember to get it checked out
* Weather Underground reports high pollen levels so you'll remember to take your allergy meds