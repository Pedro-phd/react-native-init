import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { useState } from 'react';
import {  Alert, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import * as MediaLibrary from 'expo-media-library';

export default function CameraComponent() {

  const [permission, setPermission] = useState(false)
  const [photoView, setPhotoView] = useState(false)
  const [photoDetails, setPhotoDetailts] = useState<CameraCapturedPicture>()
  const [type, setType] = useState<CameraType>(CameraType.back)
  const [flash, setFlash] = useState(0)

  let camera: Camera

  const handlePermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if(status === 'granted') {
      setPermission(true)
    } else {
      setPermission(false)
    }
  }

  const takePicture = async () => {
    if(!camera) return
    const photo = await camera.takePictureAsync()
    setPhotoDetailts(photo)
    setPhotoView(true)
  }

  const savePhoto = async () => {
    if(photoDetails?.uri) {
      MediaLibrary.saveToLibraryAsync(photoDetails.uri)
        .then(() => {
          Alert.alert('Foto salva com sucesso!')
        })
        .catch((err) => {
          Alert.alert('Erro ao salvar a foto!', err)
        })
    }
  }

 return (
  <View style={style.container}>
    {!permission && 
    <TouchableOpacity 
      style={style.button}
      onPress={handlePermission}
    >
      <Text style={style.text}>Dar permissão!</Text>
    </TouchableOpacity>}
    {permission && 
      <Camera
      style={style.camera}
      type={type}
      flashMode={flash}
      ref={(r:Camera) => {
        camera = r
      }}
    >
      <View style={style.topButtons}>
        <TouchableOpacity onPress={() => {
          setFlash(old => old === 0 ? 1 : 0)
          }}>
          <FontAwesome name="flash" size={32} color={flash === 0 ? "#000017" : "#fcba03"} />
        </TouchableOpacity>
      </View>
      <View style={style.buttons}>
        <TouchableOpacity onPress={takePicture}>
          <FontAwesome name='camera' color='#000017' size={32}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            setType(old => old === CameraType.back ? CameraType.front : CameraType.back)
          }}>
          <MaterialIcons name="flip-camera-android" size={32} color="#000017" />
        </TouchableOpacity>
      </View>
    </Camera>
  }
  {photoView && 
  <View style={style.display}>
    <View style={style.save}>
      <TouchableOpacity onPress={savePhoto}>
        <MaterialIcons name="save-alt" size={32} color="black" />
      </TouchableOpacity>
    </View>
    <View style={style.closeButton}>
      <FontAwesome 
        name='close' 
        color='black' 
        size={32} 
        onPress={() => setPhotoView(false)}
        />
    </View>
    <ImageBackground
        source={{uri:photoDetails?.uri}}
        style={{
          flex: 1
        }}
      />
  </View>}
  </View>
  );
}


const style = StyleSheet.create({
  button:{
    width: 250,
    backgroundColor: 'red',
    marginHorizontal: 'auto',
    padding:10,
    borderRadius: 8
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  container: {
    display:'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    flex:1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems:'center',
    paddingBottom: 25
  },
  display:{
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    zIndex: 9,
    left: 25,
    top: 25,
    width: 40,
    height: 40,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  buttons:{
    display: 'flex',
    width: '60%',
    borderRadius: 16,
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: 'white'
  },
  topButtons: {
    display: 'flex',
    width: '60%',
    borderRadius: 16,
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    position: 'absolute',
    top: 25,
    backgroundColor: 'white'
  },
  save: {
    position: 'absolute',
    zIndex: 9,
    right: 25,
    bottom: 25,
    width: 60,
    height: 40,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})