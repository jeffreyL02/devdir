import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import {connect} from 'react-redux';
import Save from '../actions/Save';
import Cancel from '../actions/Cancel';

// Allows profile edits
class ProfileForm extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      name: props.name,
      bio: props.bio,
      link: props.link,
      skill: props.skill
    }
  }

  handleName = (e) => {
    this.setState({name: e.target.value});
  }

  handleBio = (e) => {
    this.setState({bio: e.target.value});
  }

  handleGithub = (e) => {
    let link = this.state.link;
    link[0] = e.target.value;
    this.setState({link: link});
  }

  handleLinked = (e) => {
    let link = this.state.link;
    link[1] = e.target.value;
    this.setState({link: link});
  }

  handleMail = (e) => {
    let link = this.state.link;
    link[2] = e.target.value;
    this.setState({link: link});
  }

  handleCancel = () => {
    this.setState({
      name: this.props.name,
      bio: this.props.bio,
      link: this.props.link,
      skill: this.props.skill
    });
    this.props.cancel();
  }

  handleSave = () => {
    this.props.save(this.state);
  }

  render(){
    return(
      <div id="profile-form">
        <TextField label="Name" className="profile-input" value={this.state.name} onChange={this.handleName}/>

        <TextField 
        label="Bio"
        multiline
        rows={5}
        className="profile-input" 
        value={this.state.bio}
        onChange={this.handleBio}/>

        <div>
          {/* skill chips here*/}
        </div>

        <div>
          <TextField className="profile-input" label="Github" value={this.state.link[0]} onChange={this.handleGithub}/>
          <TextField className="profile-input" label="LinkedIn" value={this.state.link[1]} onChange={this.handleLinked}/>
          <TextField className="profile-input" label="Email" value={this.state.link[2]} onChange={this.handleMail}/>
        </div>

        <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<SaveIcon/>}
        onClick={this.handleSave}
        >
        Save
        </Button>

        <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<BlockIcon/>}
        id="cancel"
        onClick={this.handleCancel}
        >
        Cancel
        </Button>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    name: state.profile.name,
    bio: state.profile.bio,
    link: state.profile.link,
    skill: state.profile.skill
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      save: (state) => {dispatch(Save(state))},
      cancel: () => {dispatch(Cancel())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);