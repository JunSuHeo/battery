import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native';

import ChargingBar from './ChargingBar';

var size = Dimensions.get('window').width/100;
export default function BatteryInfo({Battery, navigation}){

const [fillingamount, SetFillingmount] = useState();
const [serialnum, SetSerialnum] = useState();
const [cyclecount, SetCyclecount] = useState();
const [chargestate, SetChargestate] = useState();
const [batteryerr, SetBatteryerr] = useState();
const [id, SetId] = useState();
const [serviceUUIDs, SetServiceUUIDs] = useState();
const [serialstr, SetSerialstr] = useState("");

var titled = "";
    
useEffect(()=> {

  SetFillingmount(Battery.advertising.manufacturerData.bytes[7]);
  SetSerialnum(Battery.advertising.manufacturerData.bytes[4] + Battery.advertising.manufacturerData.bytes[5] * 16 + Battery.advertising.manufacturerData.bytes[6] * 256);
  SetCyclecount(Battery.advertising.manufacturerData.bytes[9] + Battery.advertising.manufacturerData.bytes[10] * 16);
  SetBatteryerr(Battery.advertising.manufacturerData.bytes[11]);
  SetChargestate(Battery.advertising.manufacturerData.bytes[12]);
  SetId(Battery.id);
  SetServiceUUIDs(Battery.advertising.serviceUUIDs);



  if(typeof(serialnum) === 'number'){
    var tmp = serialnum.toString();
    // var serialstr = serialnum.toString();

    for(var i = 0; i < 8-tmp.length; i++) titled += "0";

    titled += serialnum;
    SetSerialstr(titled);
  }

});

return (
  <TouchableOpacity onPress={() => navigation.navigate('Detail',{Battery : [serialnum, fillingamount, chargestate, id, serviceUUIDs]})}>
   <View style={styles.List}>
    <View style={styles.ListView}>
      <Text style={styles.BatteryBar}>
        <ChargingBar Battery={fillingamount} Chargestate={chargestate} Batteryerr={batteryerr}/>
      </Text>
    </View>
    <View style={styles.ListView}>
      <Text style={styles.ListText}>
        {serialstr}
      </Text>
    </View>
    <View style={styles.ListView}>
      <Text style={styles.ListText}>
        {cyclecount}{'Cycle'}
      </Text>
    </View>
  </View>
  </TouchableOpacity>
);
}

const styles = StyleSheet.create({
  List: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    backgroundColor: '#E2E4E2',
    marginTop: size * 2,
    marginLeft: size * 3,
    marginRight: size * 3,
    borderBottomWidth: 0.9,
    borderBottomColor: "#E2E4E2",
    borderRadius: 10
  },
  ListView: {
    textAlign: 'center',
    alignItems: 'center',
    width: '33%',
    justifyContent: 'space-around',
    height: Dimensions.get('window').height/9
  },
  BatteryBar: {
    height: Dimensions.get('window').height/10,
  },
  ListText: {
    marginTop : Dimensions.get('window').height/9 * 0.7,
    alignItems: 'center',
    fontSize: Dimensions.get('window').width/100 * 4.5,
    height: Dimensions.get('window').height/9,
    color: '#353535',
    fontWeight: 'bold',
  },
});