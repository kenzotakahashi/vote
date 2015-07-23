var korean = ["Yeon Jae Nam","Yun Gyeong Lee(Celina)","Jisuk Park","Jong Bok Lee","Hyerin Joo(Joo)","Hwan Ju Oh","Min Kyung Kim","Jae Hyung Jin","Da-seul Byun(Trudy)","Seung Hwan Lee","Arim Lee(Tina)","Seowoo Park","Jong Hun Yu","Yu Been Lee","Ju Yeon Kim","Junhyeong Lee","Hyeri Kim(Harry)","Eungyo Lee","Shinae Hwang","Daseul Lee"];
var japanese = ["Saki","Asuka","Dai","Yuri","Nozomi","Yutori","Maki","Kodai","Rira","Ko","Shun","Misato","Miku","Yujiro","Sayaka","Susumu","Kohtaroh","Aoi"];


Template.voteKorean.helpers({
  students: function() {
    return korean;
  },
  error: function() {
    return Session.get('error');
  },
  counter: function() {
    var counter = Counter.findOne();
    if (!counter) {
      return "0 students have";
    } else if (counter.count == 1) {
      return "1 student has";
    } else {
      return counter.count + " students have";
    }
  }
});

Template.voteJapanese.helpers({
  students: function() {
    return japanese;
  },
  error: function() {
    return Session.get('error');
  },
  counter: function() {
    var counter = Counter.findOne();
    if (!counter) {
      return "0 students have";
    } else if (counter.count == 1) {
      return "1 student has";
    } else {
      return counter.count + " students have";
    }
  }
});

Template.voteKorean.events({
  'submit form': function(e) {
    e.preventDefault();

    var checkedList = [];
    for (i in korean) {
      var checked = document.getElementById(korean[i]).checked;
      if (checked) {
        checkedList.push(korean[i]);
      }
    }

    if (localStorage.getItem('voted')) {
      Session.set('error', "You have already voted!");      
    } else if (checkedList.length > 3) {
      Session.set('error', "You may not choose more than 3 students!");
    } else if (checkedList.length == 0) {
      Session.set('error', "You must choose at least 1 student!");
    } else {
      Session.set('error', "");
      var post = {
        list: checkedList,
        country: "Korea"
      };

      Meteor.call('postInsert', post, function(error, result) {
        if (error)
          return console.log(error.reason);
        localStorage.setItem('voted', 'true');
        Router.go('thanks');  
      });
    }
  }
});

Template.voteJapanese.events({
  'submit form': function(e) {
    e.preventDefault();

    var checkedList = [];
    for (i in japanese) {
      var checked = document.getElementById(japanese[i]).checked;
      if (checked) {
        checkedList.push(japanese[i]);
      }
    }

    if (localStorage.getItem('voted')) {
      Session.set('error', "You have already voted!");      
    } else if (checkedList.length > 3) {
      Session.set('error', "You may not choose more than 3 students!");
    } else if (checkedList.length == 0) {
      Session.set('error', "You must choose at least 1 student!");
    } else {
      Session.set('error', "");
      var post = {
        list: checkedList,
        country: "Japan"
      };

      Meteor.call('postInsert', post, function(error, result) {
        if (error)
          return console.log(error.reason);
        localStorage.setItem('voted', 'true');
        Router.go('thanks');  
      });
    }
  }
});

Template.ranking.helpers({
  students: function() {
    return Students.find({}, {sort: {count: -1} }).map(function(document, index){
      document.index = index + 1;
      return document;
    });
  }
});
