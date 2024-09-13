export const PERMISSION = {
  DELETE_AD: 1000,
  REVIEW_AD: 1001,
};

export const FEATURES = {
  deleteAdvertisement: {
    feature_id: PERMISSION.DELETE_AD,
    feature_name: "delete advertisement",
  },
  reviewAdvertisement: {
    feature_id: PERMISSION.REVIEW_AD,
    feature_name: "review advertisement",
  },
};

export const checkPermission = (allowedFeatures, featureId) => {
  if (allowedFeatures && featureId) {
    return allowedFeatures.includes(featureId);
  }
};
