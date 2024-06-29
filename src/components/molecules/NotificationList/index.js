import React, { useEffect, useState, memo } from 'react'
import { Dimensions, FlatList, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Styles from './styles'
import { useIsFocused } from '@react-navigation/native'
import { storage } from '../../../App'
import emptyNotification from "../../../theme/assets/images/notification.png";
import { navigate } from '../../../navigators/utils'
import { getReadDeliveredNotification } from '../../../utils/notificationService'
import { useApnBadge } from '../../../utils/badge_context'
import EmptyComponent from '../EmptyComponet'


const NotificationList = (props) => {
  const [notification, setNotificationList] = useState(null)
  const keyExtractor = (item, index) => index.toString()
  const { setShowBadge, showBadge } = useApnBadge()

  useEffect(() => {
    getRemoteNotification()
    // setNotificationList([{
    //   userInfo: {
    //     title: 'New notification',
    //     banner_url: '',
    //     body: 'This is new notificaiton',
    //     isRead: false,
    //     sentTime: new Date().getDate().toLocaleString()
    //   }
    // }])
  }, [])

  const getRemoteNotification = async () => {
    // if (isFocused) {
    const getRemoteNotification = storage.getString('push_notification')
    console.log('updated notification list', getRemoteNotification)
    if (getRemoteNotification) {
      const getRemoteNotificationParse = JSON.parse(getRemoteNotification)
      console.log('updated notification list', getRemoteNotificationParse)
      const sortRemoteNotification =
        getRemoteNotificationParse && getRemoteNotificationParse.length > 0
          ? getRemoteNotificationParse.sort?.((a, b) => (a.sendTime < b.sendTime ? 1 : -1))
          : []
      setNotificationList(sortRemoteNotification)
      //  }
    }
  }
  const onPressNotification = async (item) => {
    const getRemoteNotification = storage.getString('push_notification')
    console.log('-------press', getRemoteNotification, item)
    if (getRemoteNotification) {
      const getRemoteNotificationParse = JSON.parse(getRemoteNotification)
      if (getRemoteNotificationParse.find?.((itemValue) => itemValue.messageId === item.messageId)) {
        const findIndex = getRemoteNotificationParse.findIndex?.(
          (itemValue) => itemValue.messageId === item.messageId
        )
        getRemoteNotificationParse[findIndex].isRead = true

        storage.set('push_notification', JSON.stringify(getRemoteNotificationParse))
        setNotificationList(getRemoteNotificationParse)
        getReadDeliveredNotification(result => {
          setShowBadge(result.badgeValue)
        })
      }

      navigateNotification(item.userInfo)
    }
  }
  const navigateNotification = async (notificationData) => {
    switch (notificationData.notificationType) {
      // case 'category':
      //   screenStack = ScreenStackData.productCategory
      //   const category_id = Number(notificationData.categoryId)
      //   navigate('ProductListScreen', { screenStack, category_id, store_Id })
      //   break
      // case 'brand':
      //   screenStack = ScreenStackData.brandList
      //   const brandId = notificationData.brandId
      //   navigate('ProductListScreen', { screenStack, brandId, store_Id })
      //   break
      // case 'product':
      //   const item = { sku: notificationData.sku }
      //   navigate('ProductDetailScreen', { item, isFromBanner: false })
      //   break
      case 'other':
        navigate('Notification')
      default:
        console.log('others')
        navigate('Notification')
        break
    }
  }
  const renderNotificationList = ({ item, index }) => {
    console.log('---Item,', item)
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.9}
          style={Styles.notificationContainer}
          onPress={() => onPressNotification(item)}
        >
          <View style={Styles.topContainer}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              {/* <Text style={Styles.dateText}>{getDateToString(item.userInfo.sendTime)}</Text> */}
            </View>
            {!item.isRead && <View style={Styles.notificationIndicator} />}
          </View>
          <View style={Styles.bottomContainer}>
            <Text style={Styles.notificationTitle}>{item.notification.title}</Text>
            <Text style={Styles.notificationMessage}>{item.notification.body}</Text>
          </View>
        </TouchableOpacity>
      </>
    )
  }
  return (
    <View style={Styles.container}>
      <FlatList
        data={notification}
        keyExtractor={keyExtractor}
        renderItem={renderNotificationList}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        ListEmptyComponent={() => (
          <EmptyComponent
            text={"No Notifications"}
            image={emptyNotification} />
        )}
      />
    </View>
  )
}
export default memo(NotificationList)
