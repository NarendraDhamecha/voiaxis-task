export const FEATURES = {
  deleteAdvertisement: {
    feature_id: 1000,
    feature_name: "delete advertisement",
  },
  reviewAdvertisement: {
    feature_id: 1001,
    feature_name: "review advertisement",
  },
};

export const checkPermission = (allowedFeatures, featureId) => {
  return allowedFeatures.includes(featureId);
};
