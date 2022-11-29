import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MonoText } from '../components/StyledText';
import { Text, View } from '../components/Themed';

const Login = () => {
  return(
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>
          Realize seu login para continuar!
        </Text>
        <TextInput placeholder='E-mail' value='E-mail'/>
        <TextInput placeholder='Password' value='Password'/>
        <TouchableOpacity>
          <Text>Login!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: 15,
    height:'100%',
    display: 'flex',
    gap: '25px'
  }
})