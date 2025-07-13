-- Insert sample projects data
INSERT INTO projects (
  title, slug, description, long_description, technologies, main_image, images, 
  category, status, start_date, end_date, collaborators, publications, github, demo
) VALUES 
(
  'Multi-Channel Real-Time PCR System',
  'multi-channel-real-time-pcr-system',
  'The first effort in Iran to develop a multi-channel real-time PCR system with optimized temperature control.',
  'This groundbreaking project represents the first comprehensive effort in Iran to develop a sophisticated multi-channel real-time PCR system. The system features advanced temperature control algorithms, multi-channel fluorescence detection, and real-time data processing capabilities.',
  ARRAY['Biomedical Instrumentation', 'Thermal Engineering', 'PCR Technology', 'Fluorescence Detection', 'Control Systems'],
  '/placeholder.svg?height=600&width=1200',
  ARRAY['/placeholder.svg?height=600&width=1200', '/placeholder.svg?height=400&width=600'],
  'Biomedical Instrumentation',
  'completed',
  'January 2022',
  'June 2023',
  ARRAY['Dr. Sarah Johnson', 'Prof. Ahmad Rezaei'],
  ARRAY['Real-time PCR optimization in multi-channel systems - Journal of Biomedical Engineering, 2023'],
  'https://github.com/example/pcr-system',
  'https://demo.pcr-system.com'
),
(
  'Microfluidic Cell Sorting Device',
  'microfluidic-cell-sorting-device',
  'Advanced microfluidic platform for high-throughput cell sorting and analysis using acoustic waves.',
  'This project focuses on developing a novel microfluidic device that utilizes acoustic waves for precise cell sorting and analysis. The device can process thousands of cells per minute with high accuracy.',
  ARRAY['Microfluidics', 'Acoustic Engineering', 'Cell Biology', 'MEMS', 'Lab-on-Chip'],
  '/placeholder.svg?height=600&width=1200',
  ARRAY['/placeholder.svg?height=600&width=1200'],
  'Microfluidics',
  'in-progress',
  'March 2023',
  NULL,
  ARRAY['Dr. Maria Garcia', 'Prof. Chen Wei'],
  NULL,
  NULL,
  NULL
);
