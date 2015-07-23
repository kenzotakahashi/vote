Students = new Mongo.Collection('students');
Counter = new Mongo.Collection('counter');

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

    var counter = Counter.findOne();
    if (counter) {
      var counterId = Counter.update({_id: counter._id}, {$inc: {count: 1}});
    } else {
      var counterId = Counter.insert({count: 1});
    }

    return { _id: studentId };
  },
});