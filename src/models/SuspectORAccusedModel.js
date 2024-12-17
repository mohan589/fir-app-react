class SuspectOrAccusedModel {
  constructor(data = {}) {
    this.suspect_or_accused_name = data.suspect_or_accused_name || '';
    this.suspect_or_accused_father_name = data.suspect_or_accused_father_name || '';
    this.suspect_or_accused_dob = data.suspect_or_accused_dob || '';
    this.suspect_or_accused_age = data.suspect_or_accused_age || '';
    this.suspect_or_accused_gender = data.suspect_or_accused_gender || '';
    this.suspect_or_accused_nationality = data.suspect_or_accused_nationality || '';
    this.suspect_or_accused_occupation = data.suspect_or_accused_occupation || '';
    this.suspect_or_accused_caste = data.suspect_or_accused_caste || '';
    this.suspect_or_accused_passport_no = data.suspect_or_accused_passport_no || '';
    this.suspect_or_accused_aadhar_no = data.suspect_or_accused_aadhar_no || '';
    this.suspect_or_accused_mobile_no = data.suspect_or_accused_mobile_no || '';
    this.suspect_or_accused_email = data.suspect_or_accused_email || '';
    this.suspect_or_accused_address = data.suspect_or_accused_address || '';
    this.suspect_or_accused_date_of_issue = data.suspect_or_accused_date_of_issue || '';
    this.suspect_or_accused_place_of_issue = data.suspect_or_accused_place_of_issue || '';

    this.suspect_or_accused_h_no = data.suspect_or_accused_h_no || '';
    this.suspect_or_accused_h_street_or_village = data.suspect_or_accused_h_street_or_village || '';
    this.suspect_or_accused_city_or_district_id = data.suspect_or_accused_city_or_district_id || '';
    this.suspect_or_accused_state_id = data.suspect_or_accused_state_id || '';
    this.suspect_or_accused_pincode = data.suspect_or_accused_pincode || '';
    this.suspect_or_accused_area_or_mandal = data.suspect_or_accused_area_or_mandal || '';
  }

  // Example method for transformation
  getDisplayName() {
    return this.isActive ? `${this.name} (Active)` : `${this.name} (Inactive)`;
  }

  isValid() {
    if (!this.id || !this.name || !this.email.includes('@')) {
      return false;
    }
    return true;
  }
}

export default SuspectOrAccusedModel;
