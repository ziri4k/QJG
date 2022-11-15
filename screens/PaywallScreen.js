/**
 * @file Paywall Screen.
 * @author Vadim Savin
 */

 import React, { useEffect, useState } from 'react';
 import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
 import Purchases from 'react-native-purchases';
 import { PackageItem } from './components';

 
 /*
  An example paywall that uses the current offering.
  */
 const PaywallScreen = () => {
   // - State for all available package
   const [packages, setPackages] = useState([]);
 
   // - State for displaying an overlay view
   const [isPurchasing, setIsPurchasing] = useState(false);
 
   useEffect(() => {
     // Get current available packages
     const getPackages = async () => {
       try {
         const offerings = await Purchases.getOfferings();
         if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
           setPackages(offerings.current.availablePackages);
         }
       } catch (e) {
         Alert.alert('Error getting offers', e.message);
       }
     };
 
     getPackages();
   }, []);
 
   const header = () => <Text style={styles.text}>QJG Premium Subscription</Text>;
 
   const footer = () => {
    //  console.warn(
    //    "Modify this value to reflect your app's Privacy Policy and Terms & Conditions agreements. Required to make it through App Review.",
    //  );
     return (
      <View>
      <Text style={styles.text}>
       Terms and Condition
Get monthly update added on video exercise categories monthly. 
You can select monthly or annually subscription. 
Subscription will be charged to your credit card through iTunes account. 
Your subscription will automatically renew unless canceled at least 24 hours before the end of the current period.
You will not be able to cancel the subscription once activated. 

        
      </Text>
      <Text style={styles.text}>

       
Privacy policy link https://quintasjunglegym.com/
      </Text>


    </View>  
       

       
     );
   };
 
   return (
     <View style={styles.pages}>
     <View style={styles.page}>
       {/* The paywall flat list displaying each package */}
       <FlatList
         data={packages}
         renderItem={({ item }) => <PackageItem purchasePackage={item} setIsPurchasing={setIsPurchasing} />}
         keyExtractor={(item) => item.identifier}
         ListHeaderComponent={header}
         ListHeaderComponentStyle={styles.headerFooterContainer}
         ListFooterComponent={footer}
         ListFooterComponentStyle={styles.headerFooterContainer}
       />
 
       {isPurchasing && <View style={styles.overlay} />}
     </View>
     </View>
   );
 };
 
 export default PaywallScreen;
 


const styles = StyleSheet.create({
  
  page: {
    padding: 16,
    
  },
  text: {
    color: 'lightgrey',
  },
  headerFooterContainer: {
    marginVertical: 10,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
  },
});

