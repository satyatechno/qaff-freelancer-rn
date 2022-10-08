import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {Text, View, TextInput, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {LOADER, UPDATE_PROFILE} from 'src/actions/action';
import CustomButton from 'src/components/button/CustomButton';
import Container from 'src/components/container/Container';
import ErrorText from 'src/components/error-text/ErrorText';
import Header from 'src/components/header/Header';
import CustomInput from 'src/components/input/custom-input/CustomInput';
import colors from 'src/styles/texts/colors';
import styles from './EditSummary.styles';

export class EditSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isLoading: false,
      description: '',

      titleError: false,
      descriptionError: false,
    };
  }
  componentDidMount() {
    const {route} = this.props;
    if (route?.params) {
      this.setState({
        title: route?.params.title ? route?.params.title : '',
        description: route?.params.description ? route?.params.description : '',
      });
    }
  }

  handleUpdate = () => {
    if (this.state.title.length > 0 && this.state.description.length > 0) {
      // this.props.navigation.navigate('ViewProfile', {
      //   title: this.state.title,
      //   description: this.state.description,
      // });
      let data = {
        title: this.state.title,
        about: this.state.description,
      };
      this.props.dispatch(LOADER(true));
      this.props.dispatch(UPDATE_PROFILE({data: data, modal: true}));
    } else {
      if (this.state.title.length === 0) {
        this.setState({titleError: true});
      }
      if (this.state.description.length === 0) {
        this.setState({descriptionError: true});
      }
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.loading === true && this.props.loading === false) {
      this.props.navigation.navigate('ViewProfile');
    }
  }

  render() {
    const {
      t,
      route: {params},
    } = this.props;
    return (
      <>
        <Header
          backButton
          navigation={this.props.navigation}
          title={
            params?.headerTitle ? params?.headerTitle : t('summary.addSummary')
          }
          notificationButton={true}
        />
        <Container style={styles.container}>
          <Text style={{color: colors.appBlack, marginTop: 20, fontSize: 15}}>
            {t('summary.summaryText')}
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('summary.title')}</Text>
            <CustomInput
              value={this.state.title}
              handleChange={(text) => {
                this.setState({title: text});
              }}
              isClass={true}
            />
            {this.state.titleError && (
              <ErrorText
                style={{marginStart: 5}}
                text={t('summary.required')}
              />
            )}
            <Text style={styles.label}>{t('summary.description')}</Text>
            <TextInput
              // returnKeyType="done"
              multiline={true}
              style={styles.textArea}
              value={this.state.description}
              onKeyPress={(e) => {
                e.nativeEvent.key === 'Enter' && Keyboard.dismiss();
              }}
              onChangeText={(text) => this.setState({description: text})}
            />
            {this.state.descriptionError && (
              <ErrorText
                style={{marginStart: 5}}
                text={t('summary.required')}
              />
            )}
          </View>

          <View style={{}}>
            <CustomButton
              isLoading={this.props.loading}
              mode={1}
              style={{marginVertical: 10}}
              handlePress={this.handleUpdate}>
              <Text style={styles.buttonText}>{t('summary.submit')}</Text>
            </CustomButton>
          </View>
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.myReducer.loading,
});

export default withTranslation()(connect(mapStateToProps)(EditSummary));
