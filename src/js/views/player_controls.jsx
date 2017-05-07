import { h, Component } from 'preact';
import Player from '../services/player';
import Slider from './slider';

class PlayerControls extends Component {
  constructor(props) {
    super(props);
    Player.addOnStateChangeListener(this.stateChange.bind(this));
    this.state = {
      playing: false,
      repeat: false,
      shuffle: false
    };
  }

  render() {
    return (
      <div>
        <Slider />
        <div class='control-buttons'>
          <div>
            <i class={'fa fa-2x fa-retweet' + (this.state.repeat ? ' text-primary' : '')} aria-hidden='true' onClick={Player.toggleRepeat}></i>
            { this.state.repeat && <span class='badge control-badge'>1</span> }
          </div>
          <div><i class='fa fa-2x fa-fast-backward' aria-hidden='true' onClick={Player.previous}></i></div>
          { (this.state.playing) ?
            <div><i class='fa fa-2x fa-pause' aria-hidden='true' onClick={this.togglePlaying}></i></div>
            :
            <div><i class='fa fa-2x fa-play' aria-hidden='true' onClick={this.togglePlaying}></i></div>
          }
          <div><i class='fa fa-2x fa-fast-forward' aria-hidden='true' onClick={Player.next}></i></div>
          <div><i class={'fa fa-2x fa-random' + (this.state.shuffle ? ' text-primary' : '')} aria-hidden='true' onClick={Player.toggleShuffle}></i></div>
        </div>
      </div>
    );
  }

  stateChange() {
    this.setState({
      playing: Player.isPlaying,
      repeat: Player.repeat_state === Player.REPEAT.ONE,
      shuffle: Player.shuffle_on
    });
  }

  togglePlaying() {
    Player.togglePlaying();
  }
}

module.exports = PlayerControls;
