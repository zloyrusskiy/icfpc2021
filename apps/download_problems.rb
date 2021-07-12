# frozen_string_literal: true

$LOAD_PATH.unshift '../lib'
require 'addressable'
require 'nokogumbo'
require 'rest-client'

PROBLEMS_URI = 'https://poses.live/problems'
BASE_PROBLEMS_URI = Addressable::URI.parse(PROBLEMS_URI).origin
PROBLEMS_DIR = File.join(File.dirname(__FILE__), '../problems')

problems_doc = Nokogiri::HTML5.get(PROBLEMS_URI)
problems_links = problems_doc.css('a').filter_map { |link| link['href'] if link['href'] =~ %r{problems/\d+} }
problems_full_uris = problems_links.map { |link| Addressable::URI.join(BASE_PROBLEMS_URI, link).to_s }
problems_full_uris.each do |uri|
  problem_doc = Nokogiri::HTML5.get(uri)
  svg_content = problem_doc.to_s[%r{(<svg.+?</svg>)}m, 1]
  filename_prefix = uri[%r{/(\d+)}, 1]
  File.write(File.join(PROBLEMS_DIR, "#{filename_prefix}.svg"), svg_content)

  File.open(File.join(PROBLEMS_DIR, "#{filename_prefix}.json"), 'w') { |saved_file|
    block = proc { |response|
      response.read_body do |chunk|
        saved_file.write chunk
      end
    }
    RestClient::Request.execute(method: :get,
                                url: "#{uri}/download",
                                block_response: block)
  }
end