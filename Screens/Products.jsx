import { ScrollView, StyleSheet, Text, View, Dimensions, StatusBar, Image, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'react-native-linear-gradient';
import PromoBanner from '../Assets/images/banner.png'
import FeatherIcons from 'react-native-vector-icons/Feather'
import FAIcons from 'react-native-vector-icons/FontAwesome6'
import CategoryBtn from '../Components/CategoryBtn';
import Card from '../Components/Card';
import Loader from '../Components/Loader';



// const height = Dimensions.get('window').height
const sheight = Dimensions.get('screen').height

export default Products = () => {

    const [products, setProducts] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])
    const [category, setCategory] = useState('')
    // console.log(category.toLowerCase());


    // console.log(searchQuery);

    const fetchProducts = async () => {
        try {
            let response = null
            if (category === "") {
                response = await fetch('https://api.sampleapis.com/coffee/hot')
            } else {
                response = await fetch(`https://api.sampleapis.com/coffee/${category.toLowerCase()}`)
            }

            const data = await response.json()
            // console.log(data);
            setProducts(data)
        } catch (e) {
            console.log(e);
        }
    }


    const searchFun = (value) => {
        setSearchQuery(value)
        setFilteredProducts(
            products.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    }

    // console.log(filteredProducts);
    // console.log(products);

    useEffect(() => {
        fetchProducts()
    }, [category])

    useEffect(() => {
        setFilteredProducts([])
    }, [searchQuery === ''])

    return (
        <>
            <StatusBar translucent backgroundColor='transparent' />
            <ScrollView contentContainerStyle={styles.container}>
                {/* Top container */}
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#333333', '#222222', '#111111']}>
                    <View style={styles.top}>
                        <View style={styles.location}>
                            <View style={{ width: '80%', paddingTop: 5 }} >
                                <Text style={{ color: 'grey' }} >Location</Text>
                                <Text style={{ fontFamily: 'Sora-Medium', color: 'lightgrey' }}>Bilzen, Tanjungbalai</Text>
                            </View>
                            <Image src={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} style={{ width: '15%', borderRadius: 15 }} />
                        </View>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#555555', '#444444', '#444444']} style={{ borderRadius: 15 }}>
                            <View style={styles.search}>
                                <FeatherIcons name='search' color='lightgrey' size={30} />
                                <TextInput placeholderTextColor='grey' placeholder='Search coffee' style={{ flex: 1, marginHorizontal: 10 }} value={searchQuery} onChangeText={(value) => searchFun(value)} />
                                <FAIcons name='sliders' size={30} style={{ backgroundColor: '#c58b4e', color: 'white', padding: 10, borderRadius: 10 }} />
                            </View>
                        </LinearGradient>
                        <Image source={PromoBanner} style={styles.banner} />
                    </View>
                </LinearGradient>
                {/* Bottom container */}
                <View style={styles.bottom}>
                    {/* Categories */}
                    <View>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ marginLeft: 20 }}>
                            <CategoryBtn selected={category === 'Hot' || category === ""} setCategory={setCategory}>Hot</CategoryBtn>
                            <CategoryBtn selected={category === 'Cappuccino'} setCategory={setCategory}>Cappuccino</CategoryBtn>
                            <CategoryBtn selected={category === 'Machiato'} setCategory={setCategory}>Machiato</CategoryBtn>
                            <CategoryBtn selected={category === 'Latte'} setCategory={setCategory}>Latte</CategoryBtn>
                            <CategoryBtn selected={category === 'Americano'} setCategory={setCategory}>Americano</CategoryBtn>
                        </ScrollView>
                    </View>
                    {/* Products */}
                    <View style={{ marginTop: 20 }}>
                        {
                            // filteredProducts?.length > 0 ?
                            //     filteredProducts.map((item, index) => (
                            //         <Card details={item} key={index} />
                            //     )) :
                            //     products.length > 0 ?
                            //         products.map((item, index) => (
                            //             <Card details={item} key={index} />
                            //         )) : (<Text>Nothing</Text>)
                        }
                        <FlatList columnWrapperStyle={styles.cardContainer}
                            data={filteredProducts?.length > 0 ? filteredProducts : products}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => <Card details={item} key={index} />}
                            ListEmptyComponent={<Loader />}
                            numColumns={2}
                            scrollEnabled={false}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: sheight,
        backgroundColor: '#fafafa'
    },
    top: {
        height: sheight * 0.35,
        paddingBottom: 50,
        display: 'flex',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    bottom: {
        minHeight: (sheight - (sheight * 0.3)),
        paddingTop: 60,
        // paddingBottom: 30
    },
    banner: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: '-25%',
        width: '90%',
        borderRadius: 10
    },
    location: {
        height: 60,
        marginBottom: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    search: {
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 5
    },
    cardContainer: {
        justifyContent: 'center',
        marginBottom: 20,
        columnGap: 30
    }
})