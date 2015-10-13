const myFormSchema = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  author: {
    type: String,
    label: "Author"
  },
  copies: {
    type: Number,
    label: "Number of copies",
    min: 0
  },
  lastCheckedOut: {
    type: Date,
    label: "Last date this book was checked out",
    optional: true
  },
  summary: {
    type: String,
    label: "Brief summary",
    optional: true,
    max: 1000
  }
});

if (Meteor.isClient) {
  AutoForm.addHooks("special-snowflake", {
    onError(type, err) {
      console.log("err", err);
    }
  });

  Template.body.helpers({
    myFormSchema() {
      return myFormSchema;
    }
  });
}

Meteor.methods({
  "my-method"({
    title,
    author,
    copies,
    lastCheckedOut,
    summary
  }) {
    check(arguments[0], myFormSchema);

    console.log("Method successfully called on server:", arguments[0]);
  }
})
