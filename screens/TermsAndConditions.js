// screens/TermsAndConditions.js
import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';

export default function TermsAndConditionsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.content}>
        <Text style={styles.sectionTitle}>Effective Date: December 1, 2024</Text>
        {'\n\n'}

        Welcome to <Text style={styles.appName}>HealthSphere</Text> (the "App"). By using our application, you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of these Terms, please do not use our App.
        {'\n\n'}

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        {'\n'}
        By accessing or using the App, you confirm your acceptance of these Terms and agree to comply with them. If you do not agree to these Terms, you must not use the App.
        {'\n\n'}

        <Text style={styles.sectionTitle}>2. User Data</Text>
        {'\n'}
        <Text style={styles.subSectionTitle}>2.1 Data Collection and Use:</Text> We may collect personal information, such as your name, email address, and usage data. This information is utilized to:
        {'\n'}- Improve the App's performance and user experience.
        {'\n'}- Analyze user behavior to enhance features and services.
        {'\n'}- Personalize your experience within the App.
        {'\n'}- Conduct research and development to advance medical knowledge and innovation.
        {'\n\n'}

        <Text style={styles.subSectionTitle}>2.2 Data Sharing:</Text> We may share your anonymized and aggregated data with trusted third-party researchers for the purpose of medical research and development. We will ensure that any shared data is devoid of personally identifiable information.
        {'\n\n'}

        <Text style={styles.subSectionTitle}>2.3 Data Security:</Text> We implement reasonable and appropriate security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, please be aware that no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
        {'\n\n'}

        <Text style={styles.subSectionTitle}>2.4 User Rights:</Text> You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at [Your Contact Information].
        {'\n\n'}

        <Text style={styles.sectionTitle}>3. Intellectual Property</Text>
        {'\n'}
        All content and intellectual property rights in the App, including but not limited to text, graphics, logos, software, and any other materials, are owned by [Your Company Name] or its licensors. You may not use, reproduce, distribute, or create derivative works from any content in the App without our prior written consent.
        {'\n\n'}

        <Text style={styles.sectionTitle}>4. Limitation of Liability</Text>
        {'\n'}
        [Your Company Name] shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of the App or any information provided therein. This includes, but is not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses, even if we have been advised of the possibility of such damages.
        {'\n\n'}

        <Text style={styles.sectionTitle}>5. Modifications to Terms</Text>
        {'\n'}
        We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting on the App. Your continued use of the App following the posting of changes constitutes your acceptance of those changes. We encourage you to review these Terms periodically for updates.
        {'\n\n'}

        <Text style={styles.sectionTitle}>6. Governing Law</Text>
        {'\n'}
        These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction]. Any legal action or proceeding arising out of or related to these Terms shall be brought exclusively in the courts of [Your Jurisdiction].
        {'\n\n'}

        <Text style={styles.sectionTitle}>7. Dispute Resolution</Text>
        {'\n'}
        Any disputes arising out of or relating to these Terms shall be resolved through [Specify Dispute Resolution Mechanism, e.g., arbitration, mediation]. If arbitration is chosen, it shall be conducted in accordance with the rules of [Specify Arbitration Institution, e.g., the American Arbitration Association].
        {'\n\n'}

        <Text style={styles.sectionTitle}>8. Contact Information</Text>
        {'\n'}
        For any questions regarding these Terms, please contact us at [Your Contact Information].
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Ensure ScrollView expands to fit content
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  appName: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});
