// import { WaterBody, LakeWeatherReport, LakeInfo } from './components/models'
// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import Map from './components/Map';
// import { LakeMarker } from './components/LakeMarker';
// import { LakeFilterBox } from './components/LakeFilterBox';
// import { LoadingBox } from './components/LoadingBox';
// import { LakeInfoBox } from './components/LakeInfoBox';


// const mockLakes: WaterBody[] = [
//   {"latitude":"47.71290588378906","max_depth_m":null,"elevation":601.1,"max_latitude":-84.35430145263672,"max_longitude":49.015804290771484,"name":"Lake Superior","id":5621,"longitude":"-88.23358154296875","areasqkm":82002.28800277,"min_latitude":-92.11286163330078,"min_longitude":46.410011291503906},
//   {"latitude":"49.1193962097168","max_depth_m":null,"elevation":null,"max_latitude":-94.19508361816406,"max_longitude":49.393211364746094,"name":"Lake of the Woods","id":5178,"longitude":"-94.51030731201172","areasqkm":959.94157424,"min_latitude":-94.82553100585938,"min_longitude":48.8455810546875}

// ]

// const mockLakeWeatherReports: LakeWeatherReport[] = [{"last_updated_ts":"2023-06-01T22:54:57.859498+00:00","id":1593,"date":"2023-06-01","ice_alg_version":"0.0.1","ice_m":-0.4340351999999999,"is_frozen":false,"latitude":46.729553,"longitude":-94.6858998,"lake_name":"lake 255"},{"last_updated_ts":"2023-06-01T22:54:57.859498+00:00","lake_id":2190,"date":"2023-06-01","ice_alg_version":"0.0.1","ice_m":-0.4440935999999999,"is_frozen":false,"latitude":46.1871753,"longitude":-94.63948309999999,"lake_name":"meadow road"},{"last_updated_ts":"2023-06-01T22:54:57.859498+00:00","lake_id":1573,"date":"2023-06-01","ice_alg_version":"0.0.1","ice_m":-0.4340351999999999,"is_frozen":false,"latitude":46.729553,"longitude":-94.6858998,"lake_name":"lake 239"},{"last_updated_ts":"2023-06-01T22:54:57.859498+00:00","lake_id":2405,"date":"2023-06-01","ice_alg_version":"0.0.1","ice_m":-0.4440935999999999,"is_frozen":false,"latitude":46.1722654,"longitude":-94.5220499,"lake_name":"overlook"},{"last_updated_ts":"2023-06-01T22:54:57.859498+00:00","lake_id":484,"date":"2023-06-01","ice_alg_version":"0.0.1","ice_m":-0.42275759999999996,"is_frozen":false,"latitude":46.9808263,"longitude":-93.6496868,"lake_name":"clover hill"}]


// describe('Map Component', () => {
//   it('renders the Map component without errors', () => {
//     render(<Map />);
//     // Add more assertions if needed
//   });
// });

// describe('LakeFilterBox Component', () => {
//   it('calls the onLimitChange callback when the slider value is changed', () => {
//     const mockOnLimitChange = jest.fn();
//     const { getByLabelText } = render(<LakeFilterBox onLimitChange={mockOnLimitChange} />);
//     const slider = getByLabelText('Number of Lakes:');

//     fireEvent.change(slider, { target: { value: 300 } });

//     expect(mockOnLimitChange).toHaveBeenCalledWith(300);
//   });
// });

// describe('LakeMarker Component', () => {
//   it('renders the LakeMarker component without errors', () => {
//     render(<LakeMarker lakeInfo={{lake: mockLakes[0], lakeWeatherReport: mockLakeWeatherReports[0]}} clusterer={undefined} />);
//     // Add more assertions if needed
//   });
// });

// describe('LakeInfoBox Component', () => {
//   it('renders the LakeInfoBox component without errors', () => {
//     render(<LakeInfoBox lakeInfo={{lake: mockLakes[0], lakeWeatherReport: mockLakeWeatherReports[0]}} />);
//     // Add more assertions if needed
//   });
// });

// describe('LoadingBox Component', () => {
//   it('renders the LoadingBox component without errors', () => {
//     render(<LoadingBox />);
//     // Add more assertions if needed
//   });
// });