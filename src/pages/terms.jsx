import Footer from "@/components/footer";
import Header from "@/components/header";
import Head from "next/head";
import React from "react";

const Terms = () => {
  return (
    <>
      <Head>
        <title>Terms</title>
      </Head>
      <div className="w-full min-h-screen flex flex-col justify-between">
        <Header />
        <div className="h-full max-w-[1223px] mx-auto  font-kodchasan text-[18px] md:text-[24px] font-light px-5 sm:px-9 md:px-12 py-7 my-11">
          <h4>Terms and Services</h4>
          <h4>Introduction</h4>
          <p>
            
            Welcome to Authartic LLC! By accessing or using our services, you agree to be bound by these Terms of Service (&quote;Terms&quote;). These Terms constitute a legally binding agreement between you (the &quote;Vendor&quote; or &quote;User&quote;) and Authartic LLC (&quote;Company,&quote; &quote;we,&quote; &quote;us,&quote; or &quote;our&quote;). If you do not agree with these Terms, you must not access or use our services.
          </p>
          <h4>1. Definitions</h4>
          <p>
            1.1 &quote;Vendor&quote; refers to an individual or entity who subscribes to Authartic LLCs services to issue digital certificates of authenticity. 
            
          </p>
          <p>
          1.2 &quote;Certificates&quote; refers to digital certificates of authenticity provided by the Company. 
          </p>
          <p>1.3 &quote;Services&quote; refers to the platform and features provided by the Company to enable Vendors to issue and manage Certificates. </p>

          <h4>2. Services Overview</h4>
          <p>
          2.1 Authartic LLC provides digital certificates of authenticity for physical goods. The Company does not manufacture or sell physical goods. The Services are provided as-is and as-available. 
          </p>
          <p>
          2.2 The Company reserves the right to modify, suspend, or discontinue any part of the Services at its discretion and without prior notice.
          </p>

          <h4>33. Plans and Pricing</h4>
          <p>
          3.1 Starter Plan: This free plan includes 50 Certificates per month. Vendors using this plan are limited to default fonts and colors. No payment or credit card information is required. 
          </p>
          <p>
          3.2 Standard Plan: Costs $30/month and includes 100 Certificates. Additional Certificates cost $0.10 each, deducted from the $30 payment. Vendors on this plan can customize fonts and background colors for their Certificates. 
          </p>
          <p>3.2 Standard Plan: Costs $30/month and includes 100 Certificates. Additional Certificates cost $0.10 each, deducted from the $30 payment. Vendors on this plan can customize fonts and background colors for their Certificates. 3.3 Pro Plan: Costs $100/month and includes 500 Certificates. Additional Certificates cost $0.05 each, deducted from the $100 payment. This plan allows for custom fonts, font colors, and Certificate backgrounds.</p>

        
          <h4>4. Vendor Obligations</h4>
          <p>
          4.1 Vendors must provide accurate and truthful information about their products for which Certificates are issued. Any false or misleading information may result in the suspension or termination of the Vendor’s account. 
       
          </p>
          <p> 4.2 Vendors are responsible for ensuring compliance with all applicable laws and regulations related to the goods associated with Certificates. </p>
          <p>4.3 Vendors agree to indemnify and hold harmless the Company against any claims, damages, or liabilities arising from the misuse of Certificates or misrepresentation of associated goods.</p>


          <h4>5. Intellectual Property Rights</h4>
          <p>
          5.1 Authartic LLC retains all rights, title, and interest in and to its proprietary software, platform, and associated materials. 
          </p>
          <p>5.2 Vendors retain ownership of the Certificates they issue but grant the Company a limited, non-exclusive license to use and display Certificates for promotional and operational purposes.</p>


          <h4>6. Use of Services</h4>
          <p>
          6.1 Vendors are prohibited from using the Services for unlawful, fraudulent, or harmful purposes. 
          </p>
          <p>6.2 The Company reserves the right to monitor, review, and remove any content or Certificates that violate these Terms or applicable laws.</p>

          <h4>7. Service Availability and Limitations</h4>
          <p>
          7.1 The Company does not guarantee uninterrupted or error-free access to the Services. Vendors acknowledge that temporary downtime may occur due to maintenance or unforeseen technical issues.
          </p>
          <p>7.2 The Company shall not be liable for any loss of data or revenue resulting from service interruptions.</p>

          <h4>8. Account Termination</h4>
          <p>
          8.1 The Company does not terminate accounts without legal notice or a court order, except as outlined in these Terms. 
          </p>
          <p>8.2 Reports regarding Vendor or user misconduct will be evaluated on a case-by-case basis, and the Company will communicate with all the involved parties to reach a suitable resolution before taking any action.</p>
          <h4>9. Governing Law and Jurisdiction</h4>
          <p>
          These Terms shall be governed by and construed in accordance with the laws of the State of Wyoming, USA. Any disputes arising under these Terms shall be resolved exclusively in the courts located within Wyoming.
          </p>

          <h4>10. Limitation of Liability</h4>
          <p>
          10.1 To the fullest extent permitted by law, the Company shall not be liable for any indirect, incidental, consequential, or punitive damages arising from the use of the Services. 
          </p>
          <p>10.2 The Companys total liability for any claims under these Terms is limited to the total amount paid by the Vendor for Services during the three months preceding the event giving rise to the claim.</p>

          <h4>11. Amendments to Terms</h4>
          <p>
          The Company reserves the right to update or modify these Terms at any time. Vendors will be notified of significant changes via email or through the platform. Continued use of the Services after such changes constitutes acceptance of the updated Terms. 
          </p>

          <h4>12. Severability</h4>
          <p>If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.</p>

          <h4>13. Entire Agreement</h4>
          <p>These Terms, along with any other policies referenced herein, constitute the entire agreement between the Vendor and the Company concerning the Services and supersede any prior agreements or understandings.</p>

          <h4>Refund and Dispute Policy</h4>
          <p>Refund Policy Refunds are provided under the following conditions:</p>
          <p>Requests must be made within six months of the initial payment.</p>
          <p>Certificates associated with refunded payments become untradeable for end users. Affected users will receive notifications about this change.</p>
          <p>Refunds are processed after verifying that all relevant end users have been notified and their Certificates have been appropriately flagged.</p>

          <h4>Dispute Resolution</h4>
          <p>Disputes between Vendors and the Company will first be addressed through good-faith negotiation.</p>
          <p>If negotiations fail, disputes will proceed to binding arbitration conducted in accordance with the rules of the American Arbitration Association (AAA) in Wyoming.</p>
          <p>Each party shall bear its own arbitration costs unless the arbitrator determines otherwise.</p>

          <h4>Cancellation Policy</h4>

          <h4>Vendor Subscription Cancellation</h4>
          <p>Vendors may cancel their subscription at any time without penalties or additional fees.</p>   
          <p>Certificates issued during the subscription period remain valid and unaffected.</p>   

          <h4>Refunded Certificates</h4>
          <p>Certificates associated with refunded payments will be flagged as untradeable in end-user accounts. Vendors should consider this before requesting refunds.</p>

          <h4>Modifications Post-Cancellation</h4>
          <p>Certificates already issued and claimed remain unaffected. Vendors must contact Authartic LLC for potential adjustments, though such requests are not guaranteed to be accommodated.</p>

          <p>.</p>
          <p>For further assistance, please contact Authartic LLC at contact@authartic.com</p>

          
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Terms;
