/* eslint-disable no-dupe-keys */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Image, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Content,
  Body,
} from 'native-base';
import Constants from '../../utilities/Constants';
import InputText from '../../Components/InputText';
import {
  VALIDATE_EMAIL,
  REQUIRED_EMAIL,
  REQUIRED_PASSWORD,
} from '../../utilities/Constants/validationconstants';
import {useDispatch, useSelector} from 'react-redux';
import {AuthSelectors} from '../../Redux/AuthRedux';
import {AuthAction} from '../../Redux/AuthRedux';
import {objectIsEmpty} from '../../utilities/utilFunctions';
import CustomButton from '../../Components/Button';
import {HeightMatrix, Percentage} from '../../Constants/styleConstants';
import { buttonTitles } from '../../Constants/Button/buttomTitles';
import { buttonColor } from '../../Constants/Button/buttonColor';


const isSmallScreen = Constants.ScreenSize.height < Constants.baseheight;


const Login = ({navigation}) => {
  const [issubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const identifier = true;
  const isLogin = useSelector(AuthSelectors.selectIsLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      navigation.replace('MainTabs');
    }
  }, [isLogin]);

  async function loginRequestHandler() {
    setIsSubmitted(true);
    if (objectIsEmpty(email) && objectIsEmpty(password)) {
      dispatch(AuthAction.loginRequest(email, password));
    }
  }
  return (
    <Container>
      <Header transparent style={styles.header}>
        <Body />
      </Header>
      <Content
        bounces={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.textHeadingContainer}>
          <Image
            resizeMode="contain"
            style={styles.imageStyle}
            source={require('../../Assets/Images/averybit.png')}
          />
          <Text style={styles.textSubHeading}>Login</Text>
        </View>

        <View style={styles.formContainer}>
          <InputText
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Type your email"
            keyboardType="email-address"
            showErrorText={issubmitted}
            validationType={VALIDATE_EMAIL}
            requiredMessage={REQUIRED_EMAIL}
          />
          <InputText
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Type your password"
            keyboardType="default"
            secureTextEntry={true}
            showErrorText={issubmitted}
            requiredMessage={REQUIRED_PASSWORD}
          />
        </View>
        <View style={styles.forgetPasswordContainer}>
          <Text style={styles.forgetPasswordText1}>Forgot your password? </Text>
          <TouchableOpacity
            onPress={() => {
              setIsSubmitted(false);
              setEmail(null);
              setPassword(null);
            }}>
            <Text style={styles.forgetPasswordText2}>Reset password</Text>
          </TouchableOpacity>
        </View>

        <CustomButton onPress={loginRequestHandler} title={buttonTitles.logIn} color={buttonColor.logInButtonColor} />
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: isSmallScreen
      ? (Constants.ScreenSize.height * 5) / Constants.baseheight
      : (Constants.ScreenSize.height * 20) / Constants.baseheight,
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
  backarrow: {
    fontSize: (Constants.ScreenSize.width * 22) / Constants.baseWidth,
    color: '#909EB1',
  },
  textHeadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSubHeading: {
    fontSize: (Constants.ScreenSize.width * 16) / Constants.baseWidth,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 26,
    fontStyle: 'normal',
    fontFamily: 'SFProDisplay-Semibold',
    color: '#61697E',
    lineHeight: (Constants.ScreenSize.height * 30) / Constants.baseheight,
    marginTop: (Constants.ScreenSize.width * 12) / Constants.baseheight,
  },
  bgImageContainer: {
    height: (Constants.ScreenSize.height * 130.06) / Constants.baseheight,
    width: (Constants.ScreenSize.width * 123) / Constants.baseWidth,
    marginTop: (Constants.ScreenSize.height * 43) / Constants.baseheight,
  },
  formContainer: {
    width: Percentage(90),
    marginVertical: HeightMatrix(40),
  },
  forgetPasswordContainer: {
    height: (Constants.ScreenSize.height * 22) / Constants.baseheight,
    width: (Constants.ScreenSize.width * 220) / Constants.baseWidth,
    flexDirection: 'row',
  },
  forgetPasswordText1: {
    fontSize: (Constants.ScreenSize.width * 12) / Constants.baseWidth,
    textAlign: 'left',
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'SFProDisplay-Regular',
    color: '#051E56',
    lineHeight: (Constants.ScreenSize.height * 22) / Constants.baseheight,
  },
  versionText: {
    fontSize: (Constants.ScreenSize.width * 12) / Constants.baseWidth,
    textAlign: 'center',
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'SFProDisplay-Regular',
    color: '#051E56',
    opacity: 0.4,
    marginTop: (Constants.ScreenSize.height * 30) / Constants.baseheight,
  },
  forgetPasswordText2: {
    fontSize: (Constants.ScreenSize.width * 12) / Constants.baseWidth,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'SFProDisplay-Regular',
    color: '#1CBD99',
    lineHeight: (Constants.ScreenSize.height * 22) / Constants.baseheight,
  },
  buttonView: {
    height: (Constants.ScreenSize.height * 44) / Constants.baseheight,
    width: (Constants.ScreenSize.width * 327) / Constants.baseWidth,
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#203060',
  },
  textlogin: {
    fontSize: (Constants.ScreenSize.width * 16) / Constants.baseWidth,
    textAlign: 'center',
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'SFProDisplay-Regular',
    color: '#FFFFFF',
    lineHeight: (Constants.ScreenSize.height * 20) / Constants.baseheight,
  },
  registerContainer: {
    height: (Constants.ScreenSize.height * 24) / Constants.baseheight,
    width: (Constants.ScreenSize.width * 188) / Constants.baseWidth,
    marginTop: (Constants.ScreenSize.height * 12) / Constants.baseheight,
    flexDirection: 'row',
  },
  registerText1: {
    fontSize: (Constants.ScreenSize.width * 14) / Constants.baseWidth,
    textAlign: 'left',
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'SFProDisplay-Regular',
    color: '#051E56',
    lineHeight: (Constants.ScreenSize.height * 24) / Constants.baseheight,
  },
  registerText2: {
    fontSize: (Constants.ScreenSize.width * 14) / Constants.baseWidth,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'SFProDisplay-Regular',
    color: '#1CBD99',
    lineHeight: (Constants.ScreenSize.height * 24) / Constants.baseheight,
  },
  innerimagecontainer: {
    height: '100%',
    width: '100%',
  },
  imageStyle: {
    width: (Constants.ScreenSize.width * 80) / 100,
    height: 50,
    marginVertical: (Constants.ScreenSize.height * 20) / Constants.baseheight,
  },
});

export default Login;
