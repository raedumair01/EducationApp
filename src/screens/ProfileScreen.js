import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  Image, ScrollView, Platform, Alert
} from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/theme';
import { useHomeContext } from '../context/HomeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../assets/fonts/fonts';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  check, request, PERMISSIONS, RESULTS, openSettings
} from 'react-native-permissions';
import CustomTextInput from '../components/CustomTextInput';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { isDarkMode } = useThemeContext();
  const theme = isDarkMode ? darkColors : lightColors;

  const {
    firstName, setFirstName, lastName, setLastName,
    email, setEmail, phone, setPhone,
    userImage, setUserImage,
  } = useHomeContext();

  const [isModalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const ensureImagePermissions = async () => {
    const cameraPermission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });

    const photoPermission = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    });

    const checkAndRequest = async (perm) => {
      let status = await check(perm);
      if (status !== RESULTS.GRANTED) {
        status = await request(perm);
      }
      return status === RESULTS.GRANTED;
    };

    const cam = await checkAndRequest(cameraPermission);
    const photo = await checkAndRequest(photoPermission);
    if (!cam || !photo) {
      openSettings();
      return false;
    }
    return true;
  };

  const handleImageResponse = (response) => {
    if (!response.didCancel && !response.errorCode && response.assets?.[0]?.uri) {
      setUserImage(response.assets[0].uri);
    }
  };

  const openImagePicker = async () => {
    setModalVisible(false);
    if (!(await ensureImagePermissions())) return;
    launchImageLibrary({ mediaType: 'photo' }, handleImageResponse);
  };

  const openCamera = async () => {
    setModalVisible(false);
    if (!(await ensureImagePermissions())) return;
    launchCamera({ mediaType: 'photo', saveToPhotos: true }, handleImageResponse);
  };

  const handleDeleteImage = () => {
    Alert.alert('Remove Photo', 'Are you sure you want to remove your profile picture?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          setUserImage(null);
          setModalVisible(false);
        },
      },
    ]);
  };

  const validate = () => {
    const errs = {};

    if (!firstName.trim()) errs.firstName = 'First name is required';
    if (!lastName.trim()) errs.lastName = 'Last name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errs.email = 'Invalid email format';

    const digits = phone.replace(/[^0-9]/g, '');
    if (digits.length < 10) errs.phone = 'Invalid phone number';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleUpdate = () => {
    if (validate()) {
      // save logic can go here
    }
  };

  const themeText = { color: theme.text };
  const themeSubtext = { color: theme.subtext };
  const themeCard = { borderColor: theme.card };
  const themeModal = { backgroundColor: theme.card };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={20} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, themeText]}>Profile</Text>
      </View>

      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={userImage ? { uri: userImage } : require('../assets/images/avatar.jpg')}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={[styles.name, themeText]}>{firstName} {lastName}</Text>
        <Text style={[styles.email, themeSubtext]}>{email}</Text>
        <Text style={[styles.phone, themeSubtext]}>{phone}</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={[styles.input, themeText, themeCard]}
          placeholder="First Name"
          placeholderTextColor={theme.subtext}
          value={firstName}
          onChangeText={setFirstName}
        />
        {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

        <CustomTextInput
          style={[styles.input, themeText, themeCard]}
          placeholder="Last Name"
          placeholderTextColor={theme.subtext}
          value={lastName}
          onChangeText={setLastName}
        />
        {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

        <CustomTextInput
          style={[styles.input, themeText, themeCard]}
          placeholder="Email"
          placeholderTextColor={theme.subtext}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <CustomTextInput
          style={[styles.input, themeText, themeCard]}
          placeholder="Phone Number"
          placeholderTextColor={theme.subtext}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      <TouchableOpacity onPress={handleUpdate} style={styles.buttonWrapper}>
        <LinearGradient colors={['#548AD8', '#8A4BD3']} style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} style={styles.modal}>
        <View style={[styles.modalContent, themeModal]}>
          <TouchableOpacity style={styles.modalButton} onPress={openCamera}>
            <Text style={[styles.modalButtonText, themeText]}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={openImagePicker}>
            <Text style={[styles.modalButtonText, themeText]}>Gallery</Text>
          </TouchableOpacity>

          {userImage && (
            <TouchableOpacity style={styles.modalButton} onPress={handleDeleteImage}>
              <Text style={[styles.modalButtonText]}>Remove Photo</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 80 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 20, fontFamily: fonts.semiBold, marginLeft: 10 },
  avatarContainer: { alignItems: 'center', marginBottom: 30 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  name: { fontSize: 20, fontFamily: fonts.semiBold },
  email: { fontSize: 14, fontFamily: fonts.regular },
  phone: { fontSize: 14, fontFamily: fonts.regular, marginTop: 4 },
  form: { gap: 16 },
  input: {
    borderWidth: 1.2,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 4,
    fontFamily: fonts.regular,
  },
  buttonWrapper: { marginTop: 30 },
  updateButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  modal: { justifyContent: 'flex-end', margin: 0 },
  modalContent: {
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalButton: { paddingVertical: 14 },
  modalButtonText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.medium,
  },
  modalCancel: { marginTop: 8, paddingVertical: 14 },
  modalCancelText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: fonts.regular,
    color: '#999',
  },
});
