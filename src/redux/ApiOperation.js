
import { Alert } from 'react-native';
import { supabase } from '../supabase/SupabaseClient';
import { get_item } from './actions/actions';
export const updateItem = (data1, data2, id) => {
  return () => {
    return supabase
      .from('products')
      .update({ name: data1, description: data2 })
      .eq('id', id)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
// console.log("check data rw",get_item(response.data))
        // Dispatch your action here
        // return get_item(response.data);
        return get_item(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteItem = (id) => {
  return () => {
    return supabase
      .from('products')
      .delete()
      .eq('id', id)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }

        // Dispatch your action here
        return get_item(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};


export const post_item = async (formData,setFormData,setLoading,refresh) => {
    
  

    setLoading(true);
    // console.log("hey post",postItems)
    try {
      const {error} = await supabase
        .from('products')
        .insert(formData)
        .single();

      if (error) {
        throw error;
      }

      setFormData({
        name: '',
        description: '',
      });

      // Refresh the data
      refresh()
      
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred while adding the data.');
    } finally {
      setLoading(false);
    }
  };
  export  const fetch_item =  () => {
    return async()=>{

    try {
      const {data, error} = await supabase
        .from('products')
        .select('*')
        .limit(10);

      if (error) {
        throw error;
      }

      if (data) {
        // setProduct(data);
        // console.log(data);
       return get_item(data);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred while fetching data.');
    }}
  };