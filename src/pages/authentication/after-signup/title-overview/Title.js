import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import {LOADER, UPDATE_PROFILE} from 'src/actions/action';
import ErrorText from 'src/components/error-text/ErrorText';
import Header from 'src/components/header/Header';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import i18n from 'src/locale/i18n';
import colors from 'src/styles/texts/colors';
import styles from './Title.styles';

class Title extends React.Component {
  state = {
    title: null,
    description: null,
    titleError: false,
    descriptionError: false,
  };

  onSubmit = async () => {
    if (!this.state.title.length || !this.state.description.length) {
      if (!this.state.title.length) {
        this.setState({titleError: true});
      }
      if (!this.state.description.length) {
        this.setState({descriptionError: true});
      }
    } else {
      this.props.dispatch(LOADER(true));
      let data = {
        title: this.state.title,
        about: this.state.description,
      };
      this.props.dispatch(
        UPDATE_PROFILE({
          data: data,
          modal: false,
          navigation: this.props.navigation.navigate('SetupProfile'),
        }),
      );
    }
  };

  componentDidMount() {
    this.setState({
      title: this.props.userProfile?.title ? this.props.userProfile.title : '',
      description: this.props.userProfile?.about
        ? this.props.userProfile.about
        : '',
    });
  }

  // onSkip = () => {
  //   this.props.navigation.navigate('SetupProfile');
  // };

  render() {
    const {navigation, loading} = this.props;
    const {title, titleError, description, descriptionError} = this.state;
    const {onSubmit, onSkip} = this;
    return (
      <>
        <Header
          title={i18n.t('asTitle.titleAndOverview')}
          backButton
          navigation={navigation}
        />
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <Text style={styles.addSchoolText}>
            {i18n.t('asTitle.shortSummary')}
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{i18n.t('asTitle.title')}</Text>
            <CustomInput
              value={title}
              handleChange={(text) => {
                this.setState({title: text});
              }}
              isClass={true}
            />
            {titleError === true && (
              <ErrorText text={i18n.t('asTitle.required')} />
            )}
            <Text style={styles.label}>{i18n.t('asTitle.description')}</Text>
            <TextInput
              multiline={true}
              style={styles.textArea}
              value={description}
              onChangeText={(text) => this.setState({description: text})}
              onKeyPress={(e) => {
                e.nativeEvent.key === 'Enter' && Keyboard.dismiss();
              }}
            />
            {descriptionError && (
              <ErrorText text={i18n.t('asTitle.required')} />
            )}
          </View>
        </View>
        <View
          style={{
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            marginBottom: 60,
          }}>
          {/* <TouchableOpacity
            style={[styles.submitButton, {backgroundColor: colors.skyBlue}]}
            onPress={onSkip}>
            <Text style={styles.submitText}>{`Skip this Step`}</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
            {!loading ? (
              <Text style={styles.submitText}>
                {i18n.t('asTitle.submitAndNext')}
              </Text>
            ) : (
              <ActivityIndicator size={30} color={colors.defaultWhite} />
            )}
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  userProfile: state.myReducer.userProfile,
  loading: state.myReducer.loading,
});

export default connect(mapStateToProps)(Title);
