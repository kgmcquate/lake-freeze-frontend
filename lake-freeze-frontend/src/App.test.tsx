import { Lake, LakeWeatherReport, LakeInfo } from './components/models'
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Map from './components/Map';
import { LakeMarker } from './components/LakeMarker';
import { LakeFilterBox } from './components/LakeFilterBox';
import { LoadingBox } from './components/LoadingBox';
import { LakeInfoBox } from './components/LakeInfoBox';


const mockLakes: Lake[] = [
  {"longitude":"-95.82589709999999","id":3,"state_or_province":"minnesota","nearby_city_latitude":undefined,"max_depth_m":2.1336,"surface_area_m2":1088604.3776256,"latitude":"46.7584275","nearby_city_name":"detroit lakes","lake_name":"abbey","country":"USA","nearby_city_longitude":undefined},
  {"longitude":"-94.40303660000001","id":7,"state_or_province":"minnesota","nearby_city_latitude":undefined,"max_depth_m":9.144,"surface_area_m2":190202.25185280002,"latitude":"45.6047036","nearby_city_name":"avon","lake_name":"achman","country":"USA","nearby_city_longitude":undefined},
  // {"longitude": 44.9812577, "latitude": -93.2716135, "id": 100000}
]

const mockLakeWeatherReports: LakeWeatherReport[] = [{"last_updated_ts":"2023-06-01T22:54:57.859498+00:00","lake_id":1593,"date":"2023-06-01","ice_alg_version":"0.0.1","ice_m":-0.4340351999999999,"is_frozen":false,"latitude":46.729553,"longitude":-94.6858998,"lake_name":"lake 255"},{"last_updated_ts":"2023-06-01T22:54:57.859498+00:00","lake_id":2190,"date":"2023-06-01","ice_alg_version":"0.0.1","ice_m":-0.4440935999999999,"is_frozen":false,"latitude":46.1871753,"longitude":-94.63948309999999,"lake_name":"meadow road"},{"last_updated_ts":"2023-06-01T22:54:57.859498+00:00","lake_id":1573,"date":"2023-06-01","ice_alg_version":"0.0.1","ice_m":-0.4340351999999999,"is_frozen":false,"latitude":46.729553,"longitude":-94.6858998,"lake_name":"lake 239"},{"last_updated_ts":"2023-06-01T22:54:57.859498+00:00","lake_id":2405,"date":"2023-06-01","ice_alg_version":"0.0.1","ice_m":-0.4440935999999999,"is_frozen":false,"latitude":46.1722654,"longitude":-94.5220499,"lake_name":"overlook"},{"last_updated_ts":"2023-06-01T22:54:57.859498+00:00","lake_id":484,"date":"2023-06-01","ice_alg_version":"0.0.1","ice_m":-0.42275759999999996,"is_frozen":false,"latitude":46.9808263,"longitude":-93.6496868,"lake_name":"clover hill"}]


describe('Map Component', () => {
  it('renders the Map component without errors', () => {
    render(<Map />);
    // Add more assertions if needed
  });
});

describe('LakeFilterBox Component', () => {
  it('calls the onLimitChange callback when the slider value is changed', () => {
    const mockOnLimitChange = jest.fn();
    const { getByLabelText } = render(<LakeFilterBox onLimitChange={mockOnLimitChange} />);
    const slider = getByLabelText('Number of Lakes:');

    fireEvent.change(slider, { target: { value: 300 } });

    expect(mockOnLimitChange).toHaveBeenCalledWith(300);
  });
});

describe('LakeMarker Component', () => {
  it('renders the LakeMarker component without errors', () => {
    render(<LakeMarker lakeInfo={{lake: mockLakes[0], lakeWeatherReport: mockLakeWeatherReports[0]}} clusterer={undefined} />);
    // Add more assertions if needed
  });
});

describe('LakeInfoBox Component', () => {
  it('renders the LakeInfoBox component without errors', () => {
    render(<LakeInfoBox lakeInfo={{lake: mockLakes[0], lakeWeatherReport: mockLakeWeatherReports[0]}} />);
    // Add more assertions if needed
  });
});

describe('LoadingBox Component', () => {
  it('renders the LoadingBox component without errors', () => {
    render(<LoadingBox />);
    // Add more assertions if needed
  });
});