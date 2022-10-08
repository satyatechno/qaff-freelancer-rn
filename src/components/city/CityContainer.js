import {useState, useEffect} from 'react';
import {fetchCityList} from 'src/services/http.service';

const CityContainer = ({search = '', countryId = 0, children}) => {
  const [cities, setCities] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    fetchCityList({search, countryId})
      .then((city) => {
        if (isMounted) {
          console.log('cities', city?.data?.data?.city_list[0]);
          setCities(city?.data?.data?.city_list);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log('fetch city error', err);
        isMounted && setError(err?.response?.data?.errprs);
      });

    return () => (isMounted = false);
  }, [search, countryId]);

  return children(loading, error, cities);
};

export default CityContainer;
