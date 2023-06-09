import {Text, Button, View, TextInput} from 'react-native';
import {UserAuthContext} from '../context/UserAuthContext';
import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function LoginScreen() {
  const {login, setUser} = useContext(UserAuthContext);
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

  const loginUser = async () => {
    // 1. Make an HTTP Post request with my email and password
    // 2. Response - can have a token or not (200 OK, 403 Unauthorized)
    // 3. If the response is 200, store the token in storage AND in context
    const response = {statusCode: 200, data: {token: '123-456-789'}};
    await login(response.data.token);
    await setUser(userName);
    navigation.reset({routes: [{name: 'App'}]});
  };

  function onChangeHandler(e: string) {
    setUserName(e);
  }

  return (
    <View>
      <Text>login</Text>
      <TextInput placeholder="Username" onChangeText={onChangeHandler} />
      <TextInput placeholder="Password" secureTextEntry={true} />
      <Button
        title="Log In"
        onPress={async () => {
          loginUser();
        }}
      />
    </View>
  );
}
