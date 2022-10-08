import {useNetInfo} from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import {FETCH_NEWSFEED} from 'src/actions/jobs';
import styles from './NetInfoStatus.styles';

const NetInfoStatus = () => {
  const [wasOffline, setWasOffline] = useState(false);
  const [online, setOnline] = useState(false);
  const [backOnline, setBackOnline] = useState(false);
  const netInfo = useNetInfo();
  const dispatch = useDispatch();
  const offlineActions = useSelector(
    (state) => state?.offlineActionsReducer?.queuedActions,
  );

  const handleOfflineActions = () => {
    if (offlineActions.includes('FETCH_NEWSFEED')) {
      dispatch(FETCH_NEWSFEED({page: 1, search: ''}));
    }
  };

  useEffect(() => {
    if (netInfo.isConnected) {
      if (wasOffline) {
        setTimeout(() => {
          netInfo.isConnected === true && setBackOnline(false);
        }, 2000);

        setBackOnline(true);
        handleOfflineActions();
      }
      setOnline(true);
    } else {
      if (offlineActions.length) {
      }
      setBackOnline(false);
      if (online) {
        setOnline(false);
        setWasOffline(true);
      }
    }
    return () => {
      setWasOffline(false);
      setOnline(false);
      setBackOnline(false);
    };
  }, [netInfo]);

  return (
    <Animatable.View
      style={online ? styles.onlineContainer : styles.offlineContainer}
      animation="slideInLeft"
      duration={500}>
      {backOnline === true && (
        <Text style={styles.onlineText}>Back Online</Text>
      )}
      {!online && (
        <Text style={styles.offlineText}>Not connected to Internet</Text>
      )}
    </Animatable.View>
  );
};

export default NetInfoStatus;
