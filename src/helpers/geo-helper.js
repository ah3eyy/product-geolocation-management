import NodeGeoCoder from "node-geocoder";
import config from "../config/index";

const options = {
    provider: config.geo_locator.provider,
    apiKey: config.geo_locator.token,
    formatter: null,
    httpAdapter: "https"
};

const geoCoder = NodeGeoCoder(options);

const GeoHelper = {

    fetchLocationLatLng: async (address) => {
        let locationFind = await geoCoder.geocode({
            address: address,
            country: "Nigeria",
            countryCode: "NG",
            limit: 1
        });

        if (locationFind == null)
            return null;

        if (locationFind.length > 0)
            return [
                locationFind[0].latitude,
                locationFind[0].longitude
            ];

        return [];
    },

    searchAddress: async (address) => {
        let locationFind = await geoCoder.geocode({
            address: address,
            country: "Nigeria",
            countryCode: "NG",
            limit: 10
        });


        return locationFind;
    }

}

export default GeoHelper;
