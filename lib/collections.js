Students = new Mongo.Collection('students');

Meteor.methods({
  postInsert: function(postAttributes) {
    var students = postAttributes.list;
    for (i in students) {
      var student = Students.findOne({name: students[i]});
      if (student) {
        var studentId = Students.update({_id: student._id}, {$inc: {count: 1}});
      } else {
        var studentId = Students.insert({
          name: students[i],
          country: postAttributes.country,
          count: 1
        });
      }
    }

    return { _id: studentId };
  },

});











