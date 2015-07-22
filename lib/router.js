Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
	name: 'vote',
});

Router.route('/japanese', {
  name: 'voteJapanese',
});

Router.route('/korean', {
  name: 'voteKorean',
});

Router.route('/thanks', {
  name: 'thanks'
});

Router.route('/ranking', {
  name: 'ranking'
});
