import React from 'react';
import { 
  Section, 
  PageTitle, 
  MarkdownText,
  SubSection,
  SubSectionTitle
} from '../styles/StyledComponents';

const GuideView: React.FC = () => {
  return (
    <Section>
      <PageTitle>How to use this toolkit</PageTitle>
      
      <MarkdownText>
        <p>
          This toolkit provides a comprehensive overview of innovation policy tools and objectives 
          to help policymakers design effective R&D and innovation strategies. Use this guide to 
          understand how to navigate and make the most of the available resources.
        </p>
      </MarkdownText>

      <SubSection>
        <SubSectionTitle>Getting Started</SubSectionTitle>
        <MarkdownText>
          <p>
            <strong>Explore by Objective:</strong> Start by selecting a policy objective from the 
            sidebar to see which tools can help achieve that goal. Each objective page shows 
            related tools and their effectiveness.
          </p>
          <p>
            <strong>Browse Tools:</strong> Alternatively, explore individual policy tools to 
            understand their mechanisms, effectiveness, and optimal conditions for use.
          </p>
          <p>
            <strong>Use Filters:</strong> Apply filters by innovation stage, sector, delivery 
            mechanism, targeting approach, or timeline to narrow down relevant tools for your 
            specific context.
          </p>
          <p>
            <strong>Network Map:</strong> Visit the interactive network map to visualize 
            relationships between tools and objectives, helping identify tool combinations 
            and policy mixes.
          </p>
        </MarkdownText>
      </SubSection>

      <SubSection>
        <SubSectionTitle>Understanding the Tool Categories</SubSectionTitle>
        <MarkdownText>
          <p>
            Tools are categorized across multiple dimensions to help you find the most 
            appropriate instruments for your policy context:
          </p>
          <p>
            <strong>Innovation Stage:</strong> Whether the tool supports early-stage research, 
            applied research, development, demonstration, or deployment phases.
          </p>
          <p>
            <strong>Sectors:</strong> Industry focus areas including manufacturing, ICT, 
            life sciences, energy, and cross-sector applications.
          </p>
          <p>
            <strong>Delivery Mechanism:</strong> How the tool operates - from tax incentives 
            and grants to procurement and innovation vouchers.
          </p>
          <p>
            <strong>Targeting:</strong> Whether the tool is broad-based, sector-specific, 
            technology-specific, regional, or focused on particular firm sizes.
          </p>
        </MarkdownText>
      </SubSection>

      <SubSection>
        <SubSectionTitle>Interpreting Tool Information</SubSectionTitle>
        <MarkdownText>
          <p>
            Each tool page provides comprehensive information to help assess its suitability:
          </p>
          <p>
            <strong>Overall Assessment:</strong> A high-level summary of the tool's effectiveness 
            and key considerations.
          </p>
          <p>
            <strong>How It Works:</strong> Description of the tool's mechanism, complexity, 
            and flexibility.
          </p>
          <p>
            <strong>Effectiveness & UK Impact:</strong> Evidence summary of what works, 
            what doesn't, and expected time to impact.
          </p>
          <p>
            <strong>Targetability:</strong> Assessment of how precisely the tool can be 
            targeted by sector, technology, region, or firm type.
          </p>
          <p>
            <strong>CBP Recommendations:</strong> Centre for Bidirectional Progressivism's 
            specific recommendations for UK implementation.
          </p>
        </MarkdownText>
      </SubSection>

      <SubSection>
        <SubSectionTitle>Making Policy Choices</SubSectionTitle>
        <MarkdownText>
          <p>
            Effective innovation policy typically combines multiple tools working together. 
            Consider these principles when selecting tools:
          </p>
          <p>
            <strong>Policy Mix:</strong> Use complementary tools that address different 
            aspects of the innovation process rather than relying on single instruments.
          </p>
          <p>
            <strong>Context Matters:</strong> Consider your specific economic, institutional, 
            and technological context when selecting tools.
          </p>
          <p>
            <strong>Implementation Capacity:</strong> Assess your organization's ability to 
            implement and manage different types of tools effectively.
          </p>
          <p>
            <strong>Timeline Alignment:</strong> Match tool selection to your policy timeline, 
            balancing immediate needs with long-term innovation goals.
          </p>
        </MarkdownText>
      </SubSection>

      <SubSection>
        <SubSectionTitle>Navigation Tips</SubSectionTitle>
        <MarkdownText>
          <p>
            <strong>Search:</strong> Use the search box to quickly find specific tools or 
            objectives by name.
          </p>
          <p>
            <strong>Filters:</strong> Click "Advanced Filters" to access detailed filtering 
            options by category. Active filters are shown as chips that can be individually 
            removed.
          </p>
          <p>
            <strong>Cross-References:</strong> Click on objective tags within tool pages to 
            explore related objectives, or tool links within objective pages to see 
            relevant instruments.
          </p>
          <p>
            <strong>Mobile:</strong> On mobile devices, use the hamburger menu (≡) to access 
            navigation, filters, and tool/objective lists.
          </p>
        </MarkdownText>
      </SubSection>
    </Section>
  );
};

export default GuideView; 