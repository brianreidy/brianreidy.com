import React, { useState } from 'react';
import { Chip, Box, Typography } from '@mui/material';
import ViewListTwoToneIcon from '@mui/icons-material/ViewListTwoTone';
import PhotoLibraryTwoToneIcon from '@mui/icons-material/PhotoLibraryTwoTone';
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';
import VideogameAssetTwoToneIcon from '@mui/icons-material/VideogameAssetTwoTone';

export const Filter = {
  all: 'all',
  photos: 'photos',
  blogs: 'blogs',
  games: 'games'
} as const;

const FilterIcons = {
  [Filter.all]: () => <ViewListTwoToneIcon />,
  [Filter.photos]: () => <PhotoLibraryTwoToneIcon />,
  [Filter.blogs]: () => <AutoStoriesTwoToneIcon />,
  [Filter.games]: () => <VideogameAssetTwoToneIcon />,
};

const FilterChips = ({
  onFilterChange,
}: {
  onFilterChange: (x: keyof typeof Filter) => void;
}) => {
  const [selectedFilter, setSelectedFilter] = useState<keyof typeof Filter>(
    Filter.all,
  );
  const filters = Object.keys(Filter) as Array<keyof typeof Filter>;

  const handleFilterChange = (filter: keyof typeof Filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, marginBottom: 2 }}>
      {filters.map((filter) => (
        <Chip
          key={filter}
          label={filter}
          variant={selectedFilter === filter ? 'filled' : 'outlined'}
          onClick={() => handleFilterChange(filter)}
          color={selectedFilter === filter ? 'secondary' : 'default'}
          sx={{ opacity: '.7', cursor: 'pointer' }}
          icon={FilterIcons[filter]()}
        />
      ))}
    </Box>
  );
};

export default FilterChips;
