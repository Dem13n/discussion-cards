import app from 'flarum/app';
import Settings from './components/Settings';


app.initializers.add('dem13n-discussion-cards', () => {
  app.extensionData.for('dem13n-discussion-cards')
    .registerPage(Settings)
});

