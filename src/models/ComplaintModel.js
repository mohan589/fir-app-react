class ComplaintModel {
  constructor(data = {}) {
    this.complainant_name = data.complainant_name || '';
    this.complainant_father_name = data.complainant_father_name || '';
    this.complainant_dob = data.complainant_dob || '';
    this.complainant_age = data.complainant_age || '';
    this.complainant_nationality = data.complainant_nationality || '';
    this.complainant_occupation = data.complainant_occupation || '';
    this.complainant_caste = data.complainant_caste || '';
    this.complainant_passport_no = data.complainant_passport_no || '';
    this.complainant_aadhar_no = data.complainant_aadhar_no || '';
    this.complainant_mobile_no = data.complainant_mobile_no || '';
    this.complainant_email = data.complainant_email || '';
    this.complainant_address = data.complainant_address || '';
    this.complainant_date_of_issue = data.complainant_date_of_issue || '';
    this.complainant_place_of_issue = data.complainant_place_of_issue || '';

    this.complainant_h_no = data.complainant_h_no || '';
    this.complainant_h_street_or_village = data.complainant_h_street_or_village || '';
    this.complainant_city_or_district_id = data.complainant_city_or_district_id || '';
    this.complainant_state_id = data.complainant_state_id || '';
    this.complainant_pincode = data.complainant_pincode || '';
    this.complainant_area_or_mandal = data.complainant_area_or_mandal || '';
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

export default ComplaintModel;
