/**
 * # Subview.js
 *
 *  This is called from main to demonstrate the back button
 *
 */
'use strict'
/*
 * ## Imports
 *
 * Imports from redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * Router
 */
import {Actions} from 'react-native-router-flux'

/**
 * Navigation Bar
 */
import NavigationBar from 'react-native-navbar'

/**
 * The necessary components from React
 */
import React, { Component } from 'react'
import
{
  StyleSheet,
  View,
  Text,
  TouchableHighlight
}
from 'react-native'

const FBSDK = require('react-native-fbsdk');


const {
  LoginButton,
  ShareDialog,
} = FBSDK;

class HelloFacebook extends Component {
  constructor(props) {
    super(props);
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: 'https://www.facebook.com/',
    };

    this.state = {
      shareLinkContent: shareLinkContent,
    };
  }

  shareLinkWithShareDialog() {
    var tmp = this;
    ShareDialog.canShow(this.state.shareLinkContent).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(tmp.state.shareLinkContent);
        }
      }
    ).then(
      function(result) {
        if (result.isCancelled) {
          alert('Share cancelled');
        } else {
          alert('Share success with postId: '
            + result.postId);
        }
      },
      function(error) {
        alert('Share fail with error: ' + error);
      }
    );
  }

  render() {
    return (
      <View style={fbStyles.container}>
        <LoginButton />
        <TouchableHighlight style={fbStyles.share}
          onPress={this.shareLinkWithShareDialog.bind(this)}>
          <Text style={fbStyles.shareText}>Share link with ShareDialog</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const fbStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  shareText: {
    fontSize: 20,
    margin: 10,
  },
});





/**
 * Use device options so we can reference the Version
 *
 */
import * as deviceActions from '../reducers/device/deviceActions'

/**
* ## Redux boilerplate
*/

/**
 *  Instead of including all app states via ...state
 *  You probably want to explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps (state) {
  return {
    deviceVersion: state.device.version
  }
}

/*
 * Bind all the actions in deviceActions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(deviceActions, dispatch)
  }
}

var styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 80,
    padding: 10
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  }
})
/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

/**
 * ## Subview class
 */
let Subview = React.createClass({

  render () {
    var titleConfig = {
      title: I18n.t('Subview.subview')
    }

    var leftButtonConfig = {
      title: I18n.t('Subview.back'),
      handler: Actions.pop
    }

    return (
      <View>
        <NavigationBar
          title={titleConfig}
          leftButton={leftButtonConfig} />
        <View style={styles.container}>
          <Text style={styles.summary}>{I18n.t('Subview.subview')} {I18n.t('App.version')}: {this.props.deviceVersion}
          </Text>
        </View>

        <HelloFacebook />
      </View>
    )
  }
})


/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Subview)
