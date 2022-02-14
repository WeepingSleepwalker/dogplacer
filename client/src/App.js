import React from 'react';
import { Route, Switch, Link } from "react-router-dom"
import './App.css';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
// import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
// import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import mapStyles from "./mapStyles.js";
import Dogwalker from './components/Dogwalker';

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vw",
};
const center = {
  lat: 47.630, lng: -122.303
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,

};



function App() {
  console.log(mapStyles);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,

  });
  // hook for marker
  const [markers, setMarkers] = React.useState([]);
  // hook for the note created by the marker
  const [selected, setSelected] = React.useState(null);


  // set the onclick event with the time as the ID and the data from onclick event
  const onMapClick = React.useCallback((event) => {

    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);
  // use Ref to keep the map with no re-rendering
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  // const panTo = React.useCallback(({ lat, lng }) => {
  //   mapRef.current.panTo({ lat, lng });
  //   mapRef.current.setZoom(14);
  // }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "loading maps";

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <header className="App-header">
            <h3>Other Dog walkers in your Neighborhood</h3>

            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={14}
              center={center}
              options={options}
              onClick={onMapClick}
              onLoad={onMapLoad}
            >
              {markers.map(marker =>
                <Marker
                  key={marker.time.toISOString()}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  icon={{
                    url: `/dogwalk.png`,
                    // format the centering the icon
                    scaledSize: new window.google.maps.Size(20, 20),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(10, 10),
                  }}
                  // making a new note by passing the marker in onCLick event
                  onClick={() => {
                    setSelected(marker);
                  }}
                />
              )}
              {selected ? (
                <InfoWindow
                  position={{ lat: selected.lat, lng: selected.lng }}
                  onCloseClick={() => {
                    setSelected(null);
                  }}
                >
                  <div>
                    <Link style={{ color: "purple" }} to="/dogwalker">Doggo where {selected.lat, selected.lng} </Link>
                    <p style={{ color: 'purple' }}>Spotted {formatRelative(selected.time, new Date())} </p>
                    <p></p>
                  </div>
                </InfoWindow>
              ) : null}
            </GoogleMap>
          </header>
        </Route>
        <Route exact path="/dogwalker">
          <Dogwalker />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
