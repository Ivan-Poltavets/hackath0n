import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

var coordinates= ""  
class Search extends Component {
constructor(props){
    super(props);
    this.state = {text: ''};
      
}
    
    render(){
        const {onChange} = this.props;
        return(
            <View style={styles.searchBar}>
            <TextInput 
            placeholder="Search here"
            placeholderTextColor="#000"
            autoCapitalize="none"
            style={{flex:1,padding:0}}
            onChangeText={(text) => this.setState({text})}
            value = {this.state.text}
            onSubmitEditing={(event) => this.start()}>
                
            </TextInput>
            <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
            </View>
        );
    }
    start(){
        coordinates=this.state.text;
        console.log(this.state.text)
    }
}

const styles = StyleSheet.create({
    searchBar:{
        position:'absolute', 
        marginTop:"8%", 
        flexDirection:"row",
        width: '90%',
        alignSelf:'center',
        borderRadius: 20,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
        backgroundColor: '#fff',
      },
      searchIcon:{
        alignSelf:'center',
      },
})
module.exports.coordinates = coordinates;
export default Search;
