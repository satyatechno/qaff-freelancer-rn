import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fetchCountriesList} from 'src/services/http.service';

const Countries = ({children, search = ''}) => {
  const [isCountiesLoading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, [search]);
  const getCountries = async () => {
    try {
      const country = await fetchCountriesList({search});
      setLoading(false);
      console.log(
        'cc',
        JSON.stringify(country?.data?.data?.country_list[0], null, 2),
      );
      setCountries(country?.data?.data?.country_list);
    } catch (e) {
      setLoading(false);
      console.log('Fetch countries error', JSON.stringify(e?.response?.data));
    }
  };
  return children(isCountiesLoading, countries);
};

export default memo(Countries);

const styles = StyleSheet.create({});
