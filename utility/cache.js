
const prefix = "cache";
const expiryInMinutes = 5;
const store = async (key, value) => {
  try {
    await AsyncStorage.setItem(prefix + key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

const get = async (key) => {
  //query funcation
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);

    if (!item) return value;

    return item;
  } catch (error) {
    console.log(error);
  }
};

export default {
  store,
  get,
};
