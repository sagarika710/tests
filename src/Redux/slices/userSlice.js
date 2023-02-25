import {createSlice} from '@reduxjs/toolkit';
import {act} from 'react-test-renderer';
export var UserSlice = createSlice({
  name: 'user',
  initialState: {
    phone_number: null,
    organization_name: null,
    email: null,
    token: null,
    Dob: null,
    user_type: null,
    first_name: null,
    last_name: null,
    gender: null,
    _id: null,
    test: null,
    pathology_id: null,
    pathology_name: null,
    signfrom: null,
    cartlab: null,
    cart: [],
    addedtest: [],
    slotdate: null,
    slottime: null,
    slotdate_id: null,
    slottime_id: null,
    locationNmae: null,
    lat: null,
    lang: null,
    fcmToken: null,
    selectemp: null,
    selectempid: null,
    x: null,
  },
  reducers: {
    setTestcart: (state, action) => {
      console.log('setTestcart', JSON.stringify(action.payload));

      if (state.addedtest != null) {
        state.addedtest = [action.payload, ...state.addedtest];
      } else {
        state.addedtest = [action.payload, ,];
      }
      console.log('addedtest', state.addedtest);
    },
    setCart: (state, action) => {
      console.log('Phone number set', JSON.stringify(action.payload));

      if (state.cart != null) {
        state.cart = [
          {
            test: action.payload.test,
            lab_test_id: action.payload.id,
            actual_price: action.payload.actual_price,
            test_category_id: action.payload.category,
            discount_price: action.payload.discount_price,
          },
          ...state.cart,
        ];
      } else {
        state.cart = [
          {
            test: action.payload.test,
            lab_test_id: action.payload.id,
            actual_price: action.payload.actual_price,
            test_category_id: action.payload.category,
            discount_price: action.payload.price,
          },
        ];
      }
    },
    setSelectemp: (state, action) => {
      console.log('emp', JSON.stringify(action.payload));
      state.selectemp = action.payload;
    },
    setCompany: (state, action) => {
      console.log('organization', JSON.stringify(action.payload));
      state.organization_name = action.payload;
    },
    setSelectempid: (state, action) => {
      console.log('emp', JSON.stringify(action.payload));
      state.selectempid = action.payload;
    },
    setLocationOf: (state, action) => {
      console.log('location', JSON.stringify(action.payload));
      state.locationNmae = action.payload;
    },
    setFcmToken: (state, action) => {
      console.log('From Redux :', JSON.stringify(action.payload));
      state.fcmToken = action.payload;
    },
    setLat: (state, action) => {
      console.log('lat', JSON.stringify(action.payload));
      state.lat = action.payload;
    },
    setLang: (state, action) => {
      console.log('lang', JSON.stringify(action.payload));
      state.lang = action.payload;
    },
    setPhone_number: (state, action) => {
      console.log('Phone number set', JSON.stringify(action.payload));
      state.phone_number = action.payload;
    },
    setSlotDate: (state, action) => {
      console.log('slotdate', JSON.stringify(action.payload));
      state.slotdate = action.payload;
    },
    setSlotTime: (state, action) => {
      console.log('slottime', JSON.stringify(action.payload));
      state.slottime = action.payload;
    },
    setSlotDateid: (state, action) => {
      console.log('slotdateid', JSON.stringify(action.payload));
      state.slotdate_id = action.payload;
    },
    setSlotTimeid: (state, action) => {
      console.log('slottimeid', JSON.stringify(action.payload));
      state.slottime_id = action.payload;
    },
    setEmail: (state, action) => {
      console.log('Email set', JSON.stringify(action.payload));
      state.email = action.payload;
    },
    setToken: (state, action) => {
      console.log('Token set', JSON.stringify(action.payload));
      state.token = action.payload;
    },
    setDob: (state, action) => {
      console.log('Dob set', JSON.stringify(action.payload));
      state.Dob = action.payload;
    },
    setUser_type: (state, action) => {
      console.log('User type set', JSON.stringify(action.payload));
      state.user_type = action.payload;
    },
    setFirst_name: (state, action) => {
      console.log('First name set', JSON.stringify(action.payload));
      state.first_name = action.payload;
    },
    setLast_name: (state, action) => {
      console.log('Last name set', JSON.stringify(action.payload));
      state.last_name = action.payload;
    },
    setGender: (state, action) => {
      console.log('Gender set', JSON.stringify(action.payload));
      state.gender = action.payload;
    },
    setId: (state, action) => {
      console.log('Id set', JSON.stringify(action.payload));
      state._id = action.payload;
    },
    setTest: (state, action) => {
      console.log('Test', JSON.stringify(action.payload));
      state.test = action.payload;
    },
    setPathology_id: (state, action) => {
      console.log('Pathology_id', JSON.stringify(action.payload));
      state.pathology_id = action.payload;
    },
    setSignup: (state, action) => {
      console.log('Sign from', JSON.stringify(action.payload));
      state.signfrom = action.payload;
    },
    setPathology_name: (state, action) => {
      console.log('Pathology name', JSON.stringify(action.payload));
      state.pathology_name = action.payload;
    },
    setCartlab: (state, action) => {
      console.log('cart lab', JSON.stringify(action.payload));
      state.cartlab = action.payload;
    },
    cleardata: (state, action) => {
      (state.phone_number = null),
        (state.email = null),
        (state.token = null),
        (state.Dob = null),
        (state.user_type = null),
        (state.first_name = null),
        (state.last_name = null),
        (state.gender = null),
        (state._id = null);
      {
        state.cartlab = null;
      }
      {
        state.pathology_name = null;
      }
      {
        state.signfrom = null;
      }
      {
        state.pathology_id = null;
      }
      {
        state.cart = [];
      }
      {
        state.addedtest = [];
      }
      {
        state.slotdate = null;
      }
      {
        state.slottime = null;
      }
      {
        state.slotdate_id = null;
      }
      {
        state.slottime_id = null;
      }

      {
        state.lang = null;
      }
      {
        state.lat = null;
      }
      {
        state.selectemp = null;
      }
      {
        state.selectempid = null;
      }
      {
        state.organization_name = null;
      }
      console.log('All data clear');
    },

    removedata: (state, action) => {
      state.cart = state.cart.filter(
        cart => cart.lab_test_id !== action.payload,
      );

      console.log('removedata', state.cart);
    },
    removecartid: (state, action) => {
      state.addedtest = state.addedtest.filter(
        addedtest => addedtest !== action.payload,
      );

      console.log('removecartid', state.addedtest);
    },
    emptycart: (state, action) => {
      state.cart = [];
      state.selectemp = null;
      state.selectempid = null;
      state.addedtest = [];
      console.log('removedata', state.cart);
    },
  },
});
export const getCompany = state => {
  return state.user.organization_name;
};
export const getLoactonof = state => {
  return state.user.locationNmae;
};
export const getSelectemp = state => {
  return state.user.selectemp;
};
export const getSelectempid = state => {
  return state.user.selectempid;
};
export const getCart = state => {
  return state.user.cart;
};
export const getTest = state => {
  return state.user.addedtest;
};
export const getPhone_number = state => {
  return state.user.phone_number;
};
export const getEmail = state => {
  return state.user.email;
};
export const gettoken = state => {
  return state.user.token;
};
export const getDob = state => {
  return state.user.Dob;
};
export const getUser_type = state => {
  return state.user.user_type;
};
export const getFirst_name = state => {
  return state.user.first_name;
};
export const getLast_name = state => {
  return state.user.last_name;
};
export const getGender = state => {
  return state.user.gender;
};
export const getId = state => {
  return state.user._id;
};
export const getPathology_id = state => {
  return state.user.pathology_id;
};
export const getSignup = state => {
  return state.user.signfrom;
};
export const getPathology_name = state => {
  return state.user.pathology_name;
};
export const getCartlab = state => {
  return state.user.cartlab;
};
export const getSlotdate = state => {
  return state.user.slotdate;
};
export const getSlottime = state => {
  return state.user.slottime;
};
export const getSlotdateid = state => {
  return state.user.slotdate_id;
};
export const getSlottimeid = state => {
  return state.user.slottime_id;
};
export const getLat = state => {
  return state.user.lat;
};
export const getLang = state => {
  return state.user.lang;
};
export const getFcmToken = state => {
  return state.user.fcmToken;
};
export const {
  setPhone_number,
  setId,
  setDob,
  setEmail,
  setFirst_name,
  setGender,
  setLast_name,
  setToken,
  setUser_type,
  cleardata,
  setPathology_id,
  setSignup,
  setCart,
  removedata,
  removecartid,
  setPathology_name,
  setCartlab,
  emptycart,
  setTestcart,
  setSlotDate,
  setSlotTime,
  setLocationOf,
  setLat,
  setLang,
  setFcmToken,
  setSelectemp,
  setSelectempid,
  setSlotDateid,
  setSlotTimeid,
  setCompany,
} = UserSlice.actions;

export default UserSlice.reducer;
